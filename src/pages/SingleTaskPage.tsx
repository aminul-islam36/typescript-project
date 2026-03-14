import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Task } from "../types";
import { getTaskById, updateTask, deleteTask } from "../tasks/api/taskApi";

const priorityColor: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

export default function SingleTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  useEffect(() => {
    getTaskById(id!).then((t) => {
      if (t) {
        setTask(t);
        setTitle(t.title);
        setDescription(t.description);
        setPriority(t.priority);
      }
    });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updateTask(id!, { title, description, priority });
    if (updated) {
      setTask(updated);
      setIsEditing(false);
    }
  };

  const handleStatus = async (status: Task["status"]) => {
    const updated = await updateTask(id!, { status });
    if (updated) setTask(updated);
  };

  const handleDelete = async () => {
    if (confirm("Delete this task?")) {
      await deleteTask(id!);
      navigate("/tasks");
    }
  };

  if (!task)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/tasks"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        ← Back to Tasks
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold text-gray-900 w-full border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">
                  {task.title}
                </h1>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Created {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`ml-4 px-3 py-1 text-sm font-medium rounded-lg border ${priorityColor[task.priority]}`}
            >
              {task.priority.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Description
          </h3>
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p className="text-gray-600 leading-relaxed mb-6">
              {task.description}
            </p>
          )}

          <h3 className="text-sm font-semibold text-gray-700 mb-3 mt-6">
            Status
          </h3>
          <div className="flex flex-wrap gap-3">
            {(["pending", "in-progress", "completed"] as Task["status"][]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  className={`px-4 py-2 rounded-lg transition ${task.status === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {s === "in-progress"
                    ? "In Progress"
                    : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
