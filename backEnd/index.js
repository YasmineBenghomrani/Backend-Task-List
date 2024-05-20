import express from "express";
import connectDB from "./db.js";
import Task from "./models/task.js";
import cors from "cors";

const app = express();

app.listen(7000, () => {
  console.log("Your server is running at PORT 7000");
});

app.use(express.json());
app.use(cors());

connectDB();
// 1 cree un dossier et fichier js task
//2 Set up endpoint :/task
//3 CRUD request
app.post("/task", async (req, res) => {
  const taskcreated = await Task.create(req.body);
  res.send({
    message: "Task created with success",
    task: taskcreated,
  });
});

app.get("/task", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.get("/task/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.send({ message: "This task does not exist" });
  } else {
    res.send(task);
  }
});

app.put("/task/:id", async (req, res) => {
  const upDateTask = await Task.findByIdAndUpdate(req.params.id);
  if (!upDateTask) {
    res.send({ message: "This task doent exist" });
  } else {
    res.send({ message: "Updated with success" });
  }
});

app.delete("/task/:id", async (req, res) => {
  const deleteTask = await Task.findByIdAndDelete(req.params.id);
  if (!deleteTask) {
    res.send({ message: "This task doent exist" });
  } else {
    res.send({ message: "Deleted with success" });
  }
});
