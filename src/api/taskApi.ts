import { Task, FilterOptions } from "../types";

const STORAGE_KEY = "taskflow_tasks";
const DEMO_TASKS = [
  {
    id: "1",
    title: "Complete Project Documentation",
    description:
      "Write comprehensive documentation for the TaskFlow application including setup guide and API reference",
    status: "in-progress" as const,
    priority: "high" as const,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Design Database Schema",
    description:
      "Create and optimize MongoDB schema for task management system with proper indexing",
    status: "completed" as const,
    priority: "high" as const,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "Implement User Authentication",
    description:
      "Add JWT-based authentication system with login and registration functionality",
    status: "pending" as const,
    priority: "medium" as const,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    title: "Setup CI/CD Pipeline",
    description:
      "Configure automated testing and deployment pipeline using GitHub Actions",
    status: "pending" as const,
    priority: "low" as const,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    title: "Add Email Notifications",
    description:
      "Integrate email service to send notifications for task updates and reminders",
    status: "in-progress" as const,
    priority: "medium" as const,
    createdAt: new Date("2024-01-22"),
  },
];

export class TaskAPI {
  private getTasks(): Task[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      this.seed();
      return this.getTasks();
    }
    return JSON.parse(stored).map((t: any) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }));
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  async getAll(): Promise<Task[]> {
    return this.getTasks();
  }

  async getById(id: string): Promise<Task | undefined> {
    const tasks = this.getTasks();
    return tasks.find((t) => t.id === id);
  }

  async create(
    title: string,
    description: string,
    priority: Task["priority"],
  ): Promise<Task> {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
      priority,
      createdAt: new Date(),
    };
    tasks.unshift(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  async update(
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>,
  ): Promise<Task | undefined> {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    tasks[index] = { ...tasks[index], ...updates };
    this.saveTasks(tasks);
    return tasks[index];
  }

  async delete(id: string): Promise<boolean> {
    const tasks = this.getTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length === tasks.length) return false;

    this.saveTasks(filtered);
    return true;
  }

  async filter(options: FilterOptions): Promise<Task[]> {
    const tasks = this.getTasks();
    return tasks.filter((task) => {
      if (options.status && task.status !== options.status) return false;
      if (options.priority && task.priority !== options.priority) return false;
      return true;
    });
  }

  async search(query: string): Promise<Task[]> {
    const tasks = this.getTasks();
    const lowerQuery = query.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery),
    );
  }

  async seed(): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_TASKS));
  }
}
