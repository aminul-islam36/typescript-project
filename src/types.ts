export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export interface FilterOptions {
  status?: Task["status"];
  priority?: Task["priority"];
}
