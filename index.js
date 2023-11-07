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

app.use(cors());
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
    origin: "http://localhost:3000",
  },
});

// When anybody connects with socket.io server connection event will triggered.
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // join the auction with auctionID
  socket.on("joinAuction", (aucId) => {
    socket.join(aucId);
    console.log(`User with ID: ${socket.id} joined room: ${aucId}`);
  });

  // when anyone disconnects with the server this event will trigger
  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("The server is listening on the port " + process.env.PORT);
});
