import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.listen(8080, () => {
  console.log("server is listening @ http://localhost:8080");
});
