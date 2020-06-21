import * as express from "express";
import * as socketIO from "socket.io";
import { createServer } from "http";
import { pool } from "./database";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = createServer(app);

app.use(express.json());

const io = socketIO(server);

const handleUser = async (userId, userName) => {
  const res = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);

  if (res.rowCount === 0) {
    pool.query("INSERT INTO users (user_id, name) VALUES ($1, $2)", [
      userId,
      userName,
    ]);
  }
};

const joinToRoom = (socket, userId) => async (interlocutorId) => {
  const room = await pool.query(
    "SELECT * FROM rooms WHERE (user1 = $1 and user2 = $2) OR (user1 = $2 and user2 = $1) limit 1",
    [userId, interlocutorId]
  );

  const roomId = room.rows[0].id || uuidv4();

  if (room.rowCount === 0) {
    await pool.query(
      "INSERT INTO rooms (id, user1, user2) VALUES ($1, $2, $3)",
      [roomId, userId, interlocutorId]
    );

    await pool.query(
      "CREATE TABLE $1(message VARCHAR(255), from VARCHAR(255), time TIMESTAMP)",
      [roomId]
    );
  }

  socket.join(roomId);
};

const sendMessage = (socket) => async (roomId, msg) => {
  await pool.query("INSERT INTO $1 (message, from) VALUES($2, $3)", [
    roomId,
    msg.content,
    msg.from,
  ]);

  const room = await pool.query("SELECT * FROM $1", [roomId]);

  socket.to(roomId).emit("getMessage", msg);
};

io.on("connection", (socket) => {
  console.log("Connected ");

  socket.send("You are connected successfully.");
  const userId = socket.handshake.query.id;

  handleUser(userId, "jora");

  socket.on("connectToUser", joinToRoom(socket, userId));

  socket.on("sendMsg", sendMessage(socket));
});

export default server;
