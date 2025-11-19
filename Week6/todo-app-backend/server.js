// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Importing the Firestore database instance from firebase.js
const db = require("./firebase");

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Your API routes will go here...
app.get("/", async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.status(200).send({ 
      message: "Todo API is running!",
      database: "Connected",
      collections: collections.map(col => col.id)
    });
  } catch (error) {
    res.status(500).send({ 
      message: "API running but database error",
      error: error.message 
    });
  }
});

// GET: Endpoint to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    
    let tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET: Endpoint to retrieve all tasks for a user
// ... 

app.get("/tasks/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const snapshot = await db.collection("tasks").where("user", "==", user).get();
    
    let tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to add a new task
// ...

app.post("/tasks", async (req, res) => {
  const { user, name, finished } = req.body;
  
  if (!user || !name || finished === undefined) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  
  try {
    const newTask = {
      user,
      name,
      finished,
    };
    const docRef = await db.collection("tasks").add(newTask);
    const createdTask = {
      id: docRef.id,
      ...newTask,
    };
    res.status(201).send(createdTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE: Endpoint to remove a task
// ...

app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    await db.collection("tasks").doc(taskId).delete();
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});