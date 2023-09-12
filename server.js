const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./controller/todoController");

// App config
const app = express();

const port = process.env.PORT || 8000;

const connectURL = process.env.CONNECT_DB;

// Middlewares
// conver to json
app.use(express.json());

app.use(cors());

// DB config
mongoose
  .connect(connectURL)
  .then(() => {
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });

// API Endpoint

// Get todos list
app.get("/todos", getTodo);

// Create a new Todo
app.post("/addtodos", createTodo);

// Update todo
app.put("/todos/:id", updateTodo);

// Delete todo
app.delete("/todos/:id", deleteTodo);


