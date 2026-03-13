import { TaskAPI } from "../api/taskApi";
import { Task } from "../types";
import { Router } from "../router";

export async function renderTasksPage(
  api: TaskAPI,
  router: Router,
  currentFilter: "all" | Task["status"],
  searchQuery: string,
): Promise<string> {
  let tasks = await api.getAll();

  if (currentFilter !== "all") {
    tasks = await api.filter({ status: currentFilter });
  }

  if (searchQuery) {
    tasks = await api.search(searchQuery);
  }

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Task Management</h2>
      
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4">Add New Task</h3>
        <form id="addTaskForm" class="space-y-4">
          <input type="text" id="title" placeholder="Task title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <textarea id="description" placeholder="Task description" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" required></textarea>
          <select id="priority" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="low">Low Priority</option>
            <option value="medium" selected>Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Add Task</button>
        </form>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <input type="text" id="searchInput" placeholder="Search tasks..." value="${searchQuery}" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <select id="filterSelect" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all" ${currentFilter === "all" ? "selected" : ""}>All Tasks</option>
            <option value="pending" ${currentFilter === "pending" ? "selected" : ""}>Pending</option>
            <option value="in-progress" ${currentFilter === "in-progress" ? "selected" : ""}>In Progress</option>
            <option value="completed" ${currentFilter === "completed" ? "selected" : ""}>Completed</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        ${
          tasks.length === 0
            ? `<div class="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">No tasks found</div>`
            : tasks
                .map(
                  (task) => `
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer" onclick="viewTask('${task.id}')">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-800">${task.title}</h3>
                <p class="text-gray-600 mt-1">${task.description}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-sm font-medium ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}">${task.priority}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 rounded text-sm ${task.status === "pending" ? "bg-gray-800 text-white" : task.status === "in-progress" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}">${task.status === "in-progress" ? "In Progress" : task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Created: ${new Date(task.createdAt).toLocaleDateString()}</span>
              <button onclick="event.stopPropagation(); deleteTask('${task.id}')" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">Delete</button>
            </div>
          </div>
        `,
                )
                .join("")
        }
      </div>
    </div>
  `;
}
