const AppError = require("../utils/appError");
const CatchAsync = require("../utils/catchAsync");
const Task = require("./../models/task");

// 1.Create Task
exports.createTask = CatchAsync(async (req, res, next) => {
  const newTask = await Task.create({
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json({
    status: "success",
    message: "Task created successfully",
    newTask,
  });
});

exports.test = (req, res) => {
  console.log("hi");
};

// 2.Update Task
exports.updateTask = CatchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    { title: req.params.title },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    return next(new AppError("No Task found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Retrieved task successfully",
    task,
  });
});

// 3.Get a Task
exports.getTask = CatchAsync(async (req, res, next) => {
  const task = await Task.find({ title: req.params.title });
  if (!task) {
    console.log("Task not found");
    return next(new AppError("No Task found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Retrieved task successfully",
    task,
  });
});

// 4. Get all Tasks
exports.getAllTasks = CatchAsync(async (req, res, next) => {
  const allTasks = await Task.find();

  res.status(200).json({
    status: "success",
    message: "Retrived all tasks successfully",
    allTasks,
  });
});

// 5.Delete Task
exports.deleteTask = CatchAsync(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ title: req.params.title });
  if (!task) {
    return next(new AppError("No Task found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Deleted successfully",
  });
});
