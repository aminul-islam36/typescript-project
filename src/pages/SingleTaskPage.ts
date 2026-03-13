import { TaskAPI } from "../api/taskApi";
import { Task } from "../types";
import { Router } from "../router";

export async function renderSingleTaskPage(
  api: TaskAPI,
  router: Router,
  taskId: string,
): Promise<string> {
  const task = await api.getById(taskId);

  if (!task) {
    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="text-6xl mb-4">❌</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Task Not Found</h2>
          <p class="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
          <button data-route="tasks" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Back to Tasks</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button data-route="tasks" class="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition"><span class="mr-2">←</span> Back to Tasks</button>

      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="flex justify-between items-start mb-6">
          <div class="flex-1">
            <h2 class="text-3xl font-bold text-gray-800 mb-2" id="taskTitle">${task.title}</h2>
            <p class="text-gray-500 text-sm">Created: ${new Date(task.createdAt).toLocaleString()}</p>
          </div>
          <span class="px-4 py-2 rounded-full text-sm font-medium ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}" id="taskPriority">${task.priority.toUpperCase()}</span>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed" id="taskDescription">${task.description}</p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Status</h3>
          <div class="flex flex-wrap gap-3">
            <button onclick="updateTaskStatus('${task.id}', 'pending')" class="px-4 py-2 rounded-lg transition ${task.status === "pending" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}">Pending</button>
            <button onclick="updateTaskStatus('${task.id}', 'in-progress')" class="px-4 py-2 rounded-lg transition ${task.status === "in-progress" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}">In Progress</button>
            <button onclick="updateTaskStatus('${task.id}', 'completed')" class="px-4 py-2 rounded-lg transition ${task.status === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}">Completed</button>
          </div>
        </div>

        <div class="border-t pt-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Edit Task</h3>
          <form id="editTaskForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input type="text" id="editTitle" value="${task.title}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea id="editDescription" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="4" required>${task.description}</textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select id="editPriority" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
                <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
                <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
              </select>
            </div>
            <div class="flex gap-4">
              <button type="submit" class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Save Changes</button>
              <button type="button" onclick="deleteTaskFromDetail('${task.id}')" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}
