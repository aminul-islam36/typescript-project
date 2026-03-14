import { Task } from "../../types";

const BASE = "/api/tasks";

function normalize(t: any): Task {
  return {
    ...t,
    id: t._id?.toString() ?? t.id,
    createdAt: new Date(t.createdAt),
  };
}

export async function getAllTasks(): Promise<Task[]> {
  const res = await fetch(BASE);
  return (await res.json()).map(normalize);
}

export async function getTaskById(id: string): Promise<Task | null> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return null;
  return normalize(await res.json());
}

export async function createTask(
  title: string,
  description: string,
  priority: Task["priority"],
): Promise<Task> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority }),
  });
  return normalize(await res.json());
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, "id" | "createdAt">>,
): Promise<Task | null> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) return null;
  return normalize(await res.json());
}

export async function deleteTask(id: string): Promise<boolean> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function searchTasks(query: string): Promise<Task[]> {
  const res = await fetch(`${BASE}?search=${encodeURIComponent(query)}`);
  return (await res.json()).map(normalize);
}

export async function filterTasks(status: string): Promise<Task[]> {
  const res = await fetch(`${BASE}?status=${encodeURIComponent(status)}`);
  return (await res.json()).map(normalize);
}
