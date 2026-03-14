import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTasks } from "../tasks/api/taskApi";

export default function HomePage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    getAllTasks().then((tasks) => {
      setStats({
        total: tasks.length,
        pending: tasks.filter((t) => t.status === "pending").length,
        inProgress: tasks.filter((t) => t.status === "in-progress").length,
        completed: tasks.filter((t) => t.status === "completed").length,
      });
    });
  }, []);

  const cards = [
    {
      label: "Total Tasks",
      value: stats.total,
      color: "text-gray-900",
      bg: "bg-blue-50",
      icon: "📋",
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      icon: "⏳",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "⚡",
    },
    {
      label: "Completed",
      value: stats.completed,
      color: "text-green-600",
      bg: "bg-green-50",
      icon: "✅",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome to TaskFlow
        </h1>
        <p className="text-lg text-gray-600">
          Organize your work and life, finally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{c.label}</p>
                <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${c.bg} rounded-lg flex items-center justify-center text-2xl`}
              >
                {c.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/tasks"
            className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 text-xl">
              ➕
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Task</h3>
              <p className="text-sm text-gray-500">Add a new task</p>
            </div>
          </Link>
          <Link
            to="/tasks"
            className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 text-xl">
              📋
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View All Tasks</h3>
              <p className="text-sm text-gray-500">See all your tasks</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
