import express, { Router } from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";
//the type
//by the id
//post

const router = express.Router();

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const workouts = JSON.parse(fs.readFileSync("./data/workouts.json"));
  const selectedWorkout = workouts.find(
    (workout) => workout.id === parseInt(id)
  );

  if (selectedWorkout.length === 0) {
    return res.status(404).json({ message: "No workout found" });
  }

  res.json(selectedWorkout);
});

router.route("/:id/comments").post((req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res
      .status(404)
      .json({ message: "Name and comment must be provided" });
  }

  const workouts = JSON.parse(fs.readFileSync("./data/workouts.json"));
  const selectedWorkout = workouts.find(
    (workout) => workout.id === parseInt(id)
  );

  if (selectedWorkout.length === 0) {
    return res.status(404).json({ message: "No workout found" });
  }

  const newComment = {
    id: uuid(),
    timestamp: Date.now(),
    name: name,
    comment: comment,
  };

  selectedWorkout.comments.push(newComment);
  fs.writeFileSync("./data/workouts.json", JSON.stringify(workouts));

  res.status(201).json(selectedWorkout);
});

router.route("/type/:type").get((req, res) => {
  const { type } = req.params;
  const workouts = JSON.parse(fs.readFileSync("./data/workouts.json"));
  const selectedWorkouts = workouts.filter((workout) => workout.type === type);

  if (selectedWorkouts.length === 0) {
    return res.status(404).json({ message: "No workouts found" });
  }

  res.json(selectedWorkouts);
});

export default router;
