const connectDB = require("./server/config/db");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
connectDB();

app.use("/api", require("./server/routes/api"));

app.use(express.static(path.join(__dirname, "build")))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 
	     "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers",
	     "Content-Type,Origin,X-Requested-With,Accept,Authorization");
  
  next();
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running at ${port}`);
});
