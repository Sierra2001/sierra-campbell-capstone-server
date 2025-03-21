import express, { Router } from "express";
import fs from "fs";
//the type
//by the id
//post

const router = express.Router();

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const workouts = JSON.parse(fs.readFileSync("./data/workouts.json"));
  const selectedWorkout = workouts.filter(
    (workout) => workout.id === parseInt(id)
  );

  if (selectedWorkout.length === 0) {
    return res.status(404).json({ message: "No comments found" });
  }

  res.json(selectedWorkout);
});

export default router;
