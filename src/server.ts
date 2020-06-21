import * as express from "express";
import * as socketIO from "socket.io";
import { createServer } from "http";
import { pool } from "./database";

const app = express();
const server = createServer(app);

app.use(express.json());

const io = socketIO(server);

app.get("/", async () => {
  await pool.query("INSERT INTO users (user_id, name) VALUES ($1, $2)", [
    "123123123",
    "sasha",
  ]);
});

const createUser = (userId) => {
  //create user
};

const joinToRoom = (socket, userId) => (interlocutorId) => {
  //join users to the  room
};

const sendMessage = (socket) => (room, msg) => {
  //send message to users
};

io.on("connection", (socket) => {
  console.log("Connected ");

  socket.send("You are connected successfully.");
  const userId = socket.handshake.query.id;

  createUser(userId);

  socket.on("connectToUser", joinToRoom(socket, userId));

  socket.on("sendMsg", sendMessage(socket));
});

export default server;
