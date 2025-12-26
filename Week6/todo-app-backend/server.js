// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Importing the Firestore database instance and admin from firebase.js
const { db, admin } = require("./firebase");

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Auth middleware
const auth = (req, res, next) => {
  try {
    const tokenId = req.get("Authorization").split("Bearer ")[1];
    admin.auth().verifyIdToken(tokenId)
      .then((decoded) => {
        req.token = decoded;
        next();
      })
      .catch((error) => res.status(401).send(error));
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

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

// GET: Endpoint to retrieve all tasks (unprotected)
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

// GET: Endpoint to retrieve all tasks for a user (protected)
app.get("/tasks/:user", auth, async (req, res) => {
  const user = req.params.user;

  // Verify the user can only access their own tasks
  if (req.token.uid !== user) {
    return res.status(403).send({ error: "Unauthorized access" });
  }

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

// POST: Endpoint to add a new task (protected)
app.post("/tasks", auth, async (req, res) => {
  const { user, name, finished } = req.body;

  if (!user || !name || finished === undefined) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  // Verify the user can only create tasks for themselves
  if (req.token.uid !== user) {
    return res.status(403).send({ error: "Unauthorized access" });
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

// DELETE: Endpoint to remove a task (protected)
app.delete("/tasks/:id", auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    // First verify the task belongs to the authenticated user
    const taskDoc = await db.collection("tasks").doc(taskId).get();

    if (!taskDoc.exists) {
      return res.status(404).send({ error: "Task not found" });
    }

    if (taskDoc.data().user !== req.token.uid) {
      return res.status(403).send({ error: "Unauthorized access" });
    }

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