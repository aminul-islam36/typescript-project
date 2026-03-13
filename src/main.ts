import "./style.css";
import { TaskAPI } from "./api/taskApi";
import { Task } from "./types";
import { Router } from "./router";
import { renderHeader, attachHeaderListeners } from "./components/Header";
import { renderHomePage } from "./pages/HomePage";
import { renderTasksPage } from "./pages/TasksPage";
import { renderAboutPage } from "./pages/AboutPage";
import { renderSingleTaskPage } from "./pages/SingleTaskPage";

const api = new TaskAPI();
const router = new Router();
let currentFilter: "all" | Task["status"] = "all";
let searchQuery = "";
let isLoading = false;

async function initializeApp() {
  try {
    isLoading = true;
    render();
    await api.seed();
    console.log("Database seeded");
    isLoading = false;
    await render();
  } catch (error) {
    console.error("Error:", error);
    isLoading = false;
    render();
  }
}

async function render() {
  const app = document.getElementById("app")!;
  const currentRoute = router.getCurrentRoute();
  const taskId = router.getTaskId();

  if (isLoading) {
    app.innerHTML = `<div class="min-h-screen bg-gray-100 flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-4">⏳</div><p class="text-xl text-gray-600">Loading...</p></div></div>`;
    return;
  }

  let pageContent = "";

  switch (currentRoute) {
    case "home":
      pageContent = await renderHomePage(api);
      break;
    case "tasks":
      pageContent = await renderTasksPage(
        api,
        router,
        currentFilter,
        searchQuery,
      );
      break;
    case "about":
      pageContent = renderAboutPage();
      break;
    case "task":
      if (taskId) {
        pageContent = await renderSingleTaskPage(api, router, taskId);
      }
      break;
  }

  app.innerHTML = `<div class="min-h-screen bg-gray-100">${renderHeader(router, currentRoute)}${pageContent}</div>`;

  attachHeaderListeners(router);

  if (currentRoute === "tasks") {
    attachTasksPageListeners();
  }

  if (currentRoute === "home") {
    attachHomePageListeners();
  }

  if (currentRoute === "task") {
    attachSingleTaskPageListeners();
  }
}

function attachTasksPageListeners() {
  const form = document.getElementById("addTaskForm") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = (document.getElementById("title") as HTMLInputElement)
        .value;
      const description = (
        document.getElementById("description") as HTMLTextAreaElement
      ).value;
      const priority = (
        document.getElementById("priority") as HTMLSelectElement
      ).value as Task["priority"];
      await api.create(title, description, priority);
      form.reset();
      await render();
    });
  }

  const searchInput = document.getElementById(
    "searchInput",
  ) as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener("input", async (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      await render();
    });
  }

  const filterSelect = document.getElementById(
    "filterSelect",
  ) as HTMLSelectElement;
  if (filterSelect) {
    filterSelect.addEventListener("change", async (e) => {
      const value = (e.target as HTMLSelectElement).value;
      currentFilter = value as typeof currentFilter;
      await render();
    });
  }
}

function attachHomePageListeners() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const route = (e.currentTarget as HTMLElement).dataset.route;
      if (route) {
        router.navigate(route as any);
      }
    });
  });
}

function attachSingleTaskPageListeners() {
  const form = document.getElementById("editTaskForm") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const taskId = router.getTaskId();
      if (taskId) {
        const title = (document.getElementById("editTitle") as HTMLInputElement)
          .value;
        const description = (
          document.getElementById("editDescription") as HTMLTextAreaElement
        ).value;
        const priority = (
          document.getElementById("editPriority") as HTMLSelectElement
        ).value as Task["priority"];
        await api.update(taskId, { title, description, priority });
        await render();
      }
    });
  }

  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const route = (e.currentTarget as HTMLElement).dataset.route;
      if (route) {
        router.navigate(route as any);
      }
    });
  });
}

(window as any).viewTask = (id: string) => {
  router.navigate("task", id);
};

(window as any).updateStatus = async (id: string, status: Task["status"]) => {
  await api.update(id, { status });
  await render();
};

(window as any).updateTaskStatus = async (
  id: string,
  status: Task["status"],
) => {
  await api.update(id, { status });
  await render();
};

(window as any).deleteTask = async (id: string) => {
  if (confirm("Are you sure you want to delete this task?")) {
    await api.delete(id);
    await render();
  }
};

(window as any).deleteTaskFromDetail = async (id: string) => {
  if (confirm("Are you sure you want to delete this task?")) {
    await api.delete(id);
    router.navigate("tasks");
  }
};

router.onRouteChange(async () => {
  await render();
});

router.init();
initializeApp();
