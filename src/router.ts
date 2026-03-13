export type Route = "home" | "about" | "tasks" | "task";

export class Router {
  private currentRoute: Route = "home";
  private taskId: string | null = null;
  private listeners: Array<(route: Route, taskId?: string | null) => void> = [];

  navigate(route: Route, taskId?: string) {
    this.currentRoute = route;
    this.taskId = taskId || null;
    const hash = taskId ? `#${route}/${taskId}` : `#${route}`;
    window.history.pushState({}, "", hash);
    this.notifyListeners();
  }

  getCurrentRoute(): Route {
    return this.currentRoute;
  }

  getTaskId(): string | null {
    return this.taskId;
  }

  onRouteChange(callback: (route: Route, taskId?: string | null) => void) {
    this.listeners.push(callback);
  }

  private notifyListeners() {
    this.listeners.forEach((callback) =>
      callback(this.currentRoute, this.taskId),
    );
  }

  init() {
    const hash = window.location.hash.slice(1);
    const parts = hash.split("/");
    const route = parts[0] as Route;

    if (route && ["home", "about", "tasks", "task"].includes(route)) {
      this.currentRoute = route;
      if (route === "task" && parts[1]) {
        this.taskId = parts[1];
      }
    }
    this.notifyListeners();
  }
}
