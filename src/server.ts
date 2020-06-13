import * as express from "express";
import * as socketIO from "socket.io";
import { createServer } from "http";

const app = express();

const io = socketIO(createServer(app));

io.on("connect", (socket) => {
  console.log("Connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
