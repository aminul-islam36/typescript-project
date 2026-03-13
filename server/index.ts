import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 3000;

const uri =
  "mongodb+srv://TESTAPI:i1X9GsOAbvBKiyLw@cluster0.ty9bkxj.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

let db: any;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("taskflow");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await db
      .collection("tasks")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET single task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// CREATE task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const newTask = {
      title,
      description,
      status: "pending",
      priority: priority || "medium",
      createdAt: new Date(),
    };
    const result = await db.collection("tasks").insertOne(newTask);
    res.json({ ...newTask, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// UPDATE task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await db
      .collection("tasks")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: updates },
        { returnDocument: "after" },
      );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// SEARCH tasks
app.get("/api/tasks/search/:query", async (req, res) => {
  try {
    const tasks = await db
      .collection("tasks")
      .find({
        $or: [
          { title: { $regex: req.params.query, $options: "i" } },
          { description: { $regex: req.params.query, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to search tasks" });
  }
});

// FILTER tasks
app.get("/api/tasks/filter/:field/:value", async (req, res) => {
  try {
    const query: any = {};
    query[req.params.field] = req.params.value;
    const tasks = await db
      .collection("tasks")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter tasks" });
  }
});

// Seed database
app.post("/api/seed", async (req, res) => {
  try {
    await db.collection("tasks").deleteMany({});

    const demoTasks = [
      {
        title: "Complete Project Documentation",
        description:
          "Write comprehensive documentation for the TaskFlow application including setup guide and API reference",
        status: "in-progress",
        priority: "high",
        createdAt: new Date("2024-01-15"),
      },
      {
        title: "Design Database Schema",
        description:
          "Create and optimize MongoDB schema for task management system with proper indexing",
        status: "completed",
        priority: "high",
        createdAt: new Date("2024-01-10"),
      },
      {
        title: "Implement User Authentication",
        description:
          "Add JWT-based authentication system with login and registration functionality",
        status: "pending",
        priority: "medium",
        createdAt: new Date("2024-01-20"),
      },
      {
        title: "Setup CI/CD Pipeline",
        description:
          "Configure automated testing and deployment pipeline using GitHub Actions",
        status: "pending",
        priority: "low",
        createdAt: new Date("2024-01-18"),
      },
      {
        title: "Add Email Notifications",
        description:
          "Integrate email service to send notifications for task updates and reminders",
        status: "in-progress",
        priority: "medium",
        createdAt: new Date("2024-01-22"),
      },
    ];

    await db.collection("tasks").insertMany(demoTasks);
    res.json({
      message: "Database seeded successfully",
      count: demoTasks.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed database" });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
