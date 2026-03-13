import { TaskAPI } from "../api/taskApi";

export async function renderHomePage(api: TaskAPI): Promise<string> {
  const tasks = await api.getAll();
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Welcome to TaskFlow</h2>
        <p class="text-gray-600">Manage your tasks efficiently and stay productive</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Tasks</p>
              <p class="text-3xl font-bold text-gray-800">${stats.total}</p>
            </div>
            <div class="text-4xl">📋</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Pending</p>
              <p class="text-3xl font-bold text-yellow-600">${stats.pending}</p>
            </div>
            <div class="text-4xl">⏳</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">In Progress</p>
              <p class="text-3xl font-bold text-blue-600">${stats.inProgress}</p>
            </div>
            <div class="text-4xl">🚀</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Completed</p>
              <p class="text-3xl font-bold text-green-600">${stats.completed}</p>
            </div>
            <div class="text-4xl">✅</div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h3 class="text-2xl font-bold mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button data-route="tasks" class="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition">
            <div class="text-3xl mb-2">➕</div>
            <div class="font-semibold">Create Task</div>
          </button>
          <button data-route="tasks" class="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition">
            <div class="text-3xl mb-2">📝</div>
            <div class="font-semibold">View All Tasks</div>
          </button>
          <button data-route="about" class="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition">
            <div class="text-3xl mb-2">ℹ️</div>
            <div class="font-semibold">About Us</div>
          </button>
        </div>
      </div>
    </div>
  `;
}
