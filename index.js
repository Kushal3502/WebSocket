import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    // console.log("New message :: ", message);
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => res.sendFile("./public/index.html"));

server.listen(3000, () => console.log("Server is running at port :: 3000"));
