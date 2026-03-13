import { Router, Route } from "../router";

export function renderHeader(router: Router, currentRoute: Route): string {
  const navItems: Array<{ route: Route; label: string; icon: string }> = [
    { route: "home", label: "Home", icon: "🏠" },
    { route: "tasks", label: "Tasks", icon: "✓" },
    { route: "about", label: "About Us", icon: "ℹ️" },
  ];

  return `
    <header class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-2 cursor-pointer" data-route="home">
            <span class="text-2xl">📝</span>
            <h1 class="text-2xl font-bold text-gray-800">TaskFlow</h1>
          </div>
          
          <nav class="flex space-x-1">
            ${navItems
              .map(
                (item) => `
              <button
                data-route="${item.route}"
                class="px-4 py-2 rounded-lg transition ${
                  currentRoute === item.route
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }"
              >
                <span class="mr-2">${item.icon}</span>
                ${item.label}
              </button>
            `,
              )
              .join("")}
          </nav>
        </div>
      </div>
    </header>
  `;
}

export function attachHeaderListeners(router: Router) {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const route = (e.currentTarget as HTMLElement).dataset.route as Route;
      router.navigate(route);
    });
  });
}
