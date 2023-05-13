const connectDB = require("./server/config/db");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ extended: false }));
connectDB();

app.use("/api", require("./server/routes/api"));

app.use(express.static(path.join(__dirname, "build")))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(cors());
app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
  	res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running at ${port}`);
});
