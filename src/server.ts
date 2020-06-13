import * as express from "express";
import * as socketIO from "socket.io";
import { createServer } from "http";

const app = express();

const server = createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Connected");
});

export default server;
