const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes")
const connectDB = require("./config/db.js");

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


server.listen(process.env.PORT, () => {
  console.log("The server is listening on the port " + process.env.PORT);
});
