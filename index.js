const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the auction server!");
});

try {
  let connection = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (connection) {
    console.log("The database connection is successfull");
  }
} catch (error) {
  console.log(error);
}

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("The server is listening on the port " + process.env.PORT);
});
