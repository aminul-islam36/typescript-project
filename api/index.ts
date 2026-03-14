import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://TESTAPI:i1X9GsOAbvBKiyLw@cluster0.ty9bkxj.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

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

async function getDB() {
  await client.connect();
  const db = client.db("taskflow");
  const count = await db.collection("tasks").countDocuments();
  if (count === 0) await db.collection("tasks").insertMany(demoTasks);
  return db;
}

app.get("/api/health", async (req, res) => {
  try {
    await getDB();
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

// GET all tasks — supports ?search=, ?status=, ?priority=
app.get("/api/tasks", async (req, res) => {
  try {
    const db = await getDB();
    const { search, status, priority } = req.query as Record<string, string>;
    let query: any = {};
    if (search)
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    else if (status) query = { status };
    else if (priority) query = { priority };
    const tasks = await db
      .collection("tasks")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const db = await getDB();
    const task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(req.params.id) });
    task ? res.json(task) : res.status(404).json({ error: "Task not found" });
  } catch {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const db = await getDB();
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
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const db = await getDB();
    const result = await db
      .collection("tasks")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" },
      );
    res.json(result);
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const db = await getDB();
    await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default app;
