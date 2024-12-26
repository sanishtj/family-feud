const express = require("express");
const next = require("next");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from this origin
      methods: ["GET", "POST", "PUT"],
      credentials: true,
    },
  });

  server.use(express.json());

  // Custom endpoint to list all questions
  server.get("/api/questions", (req, res) => {
    const jsonFilePath = path.join(__dirname, "src/app/data/questions.json");
    const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    res.status(200).json(data.questions);
  });

  // Custom endpoint to reset the game
  server.post("/api/questions/reset", (req, res) => {
    const jsonFilePath = path.join(__dirname, "src/app/data/questions.json");
    const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    data.questions.forEach((question) => {
      question.used = false;
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    res.status(200).json({ message: "Game reset successfully" });
  });

  // Custom endpoint to update a specific question
  server.put("/api/questions/:id", (req, res) => {
    const jsonFilePath = path.join(__dirname, "src/app/data/questions.json");
    const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    const questionId = req.params.id;
    const updatedQuestion = req.body;

    const questionIndex = data.questions.findIndex(
      (question) => question.id === questionId
    );

    if (questionIndex !== -1) {
      data.questions[questionIndex] = updatedQuestion;
      fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
      res.status(200).json(updatedQuestion);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  });

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
