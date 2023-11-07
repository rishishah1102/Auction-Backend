const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db.js");
const { Server } = require("socket.io");

// Databse config
connectDB();

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: "https://auction-ipl.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the auction server!");
});

// socket io connection with server
const io = new Server(server, {
  cors: {
    // the socket will accept req from only react server
    origin: "https://auction-ipl.vercel.app",
    methods: ["GET", "POST"],
  },
});

// to track users in auction
let auctionRoomUsers = {};

// When anybody connects with socket.io server connection event will triggered.
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // join the auction with auctionID
  socket.on("joinAuction", (aucId) => {
    if (auctionRoomUsers[aucId] && auctionRoomUsers[aucId].length >= 10) {
      // If the room is full, prevent the user from joining
      socket.emit("auctionFull");
      return;
    }

    socket.join(aucId);
    console.log(`User with ID: ${socket.id} joined room: ${aucId}`);

    // Track the user in the auction room
    if (!auctionRoomUsers[aucId]) {
      auctionRoomUsers[aucId] = [];
    }
    auctionRoomUsers[aucId].push(socket.id);

    // Emit the updated list of users to all clients in the room
    io.to(aucId).emit("updateUsers", auctionRoomUsers[aucId]);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);

    // Remove the user from the auction room and emit the updated list
    for (const aucId in auctionRoomUsers) {
      auctionRoomUsers[aucId] = auctionRoomUsers[aucId].filter(
        (id) => id !== socket.id
      );
      io.to(aucId).emit("updateUsers", auctionRoomUsers[aucId]);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log("The server is listening on the port " + process.env.PORT);
});
