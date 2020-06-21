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

io.on("connection", (socket) => {
  console.log("Connected");
});

export default server;
