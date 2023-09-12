const mongoose = require("mongoose");
const Todos = require("../dbTodos");

// get todo
const getTodo = async (req, res) => {
  try {
    const allTodos = await Todos.find({}).sort({ createdAt: -1 });
    res.status(200).send(allTodos);
    console.log("Get data complete");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
};

// create todo
const createTodo = async (req, res) => {
  const dbTodo = req.body;
  try {
    const newTodo = await Todos.create(dbTodo);
    res.status(201).send(newTodo);
    console.log("create data complete");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error)
  }
};

// update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is todo woth the id of ${id}`);
    }
    const todoID = { _id: id };
    const update = { completed: true };
    const updateTodo = await Todos.findOneAndUpdate(todoID, update);
    if (!updateTodo) {
      return res.status(404).send(`There is todo woth the id of ${id}`);
    }
    res.status(200).send(updateTodo);
    console.log("update data complete");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error)
  }
};

// update todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is todo woth the id of ${id}`);
    }
    const deleteTodo = await Todos.findOneAndDelete({ _id: id });
    res.status(200).send(deleteTodo);

    console.log("delete data complete");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error)
  }
};

module.exports = {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
