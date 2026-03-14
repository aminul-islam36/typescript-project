import { Link } from "react-router-dom";
import { Task } from "../../types";

const priorityColor: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

const statusColor: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  "in-progress": "bg-blue-100 text-blue-700",
  pending: "bg-gray-100 text-gray-700",
};

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link to={`/tasks/${task.id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition line-clamp-1">
              {task.title}
            </h3>
          </Link>
          <span
            className={`ml-2 px-2 py-1 text-xs font-medium rounded-md border ${priorityColor[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[task.status]}`}
          >
            {task.status === "in-progress"
              ? "In Progress"
              : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-xl">
        <p className="text-xs text-gray-500">
          Created {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
