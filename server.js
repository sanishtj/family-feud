const express = require("express");
const next = require("next");
const http = require("http");
const socketIo = require("socket.io");
const jsonServer = require("json-server");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from this origin
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // JSON Server setup
  const router = jsonServer.router(
    path.join(__dirname, "src/app/data/questions.json")
  );
  const middlewares = jsonServer.defaults();
  server.use("/api", middlewares, router);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("publishQuestion", (question) => {
      io.emit("publishQuestion", question);
    });

    socket.on("revealAnswer", (answer) => {
      io.emit("revealAnswer", answer);
    });

    socket.on("awardPoints", (teamScore) => {
      io.emit("awardPoints", teamScore);
    });

    socket.on("wrongAnswer", () => {
      io.emit("wrongAnswer");
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
