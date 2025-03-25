import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.listen(8080, () => {
  console.log("server is listening @ http://localhost:8080");
});
