import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Auth
export const login = (data: { email: string; password: string }) =>
  API.post("/login", data);

export const logout = () => API.post("/logout");

// Users
export const getUsers = () => API.get("/users");

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => API.post("/register", data);

// Tasks
export const createTask = (data: {
  title: string;
  description: string;
  status: string;
  user_ids?: number[];   // ✅ make optional
  admin_id: number;
}) => API.post("/tasks", data);

export const getTasks = () => API.get("/tasks"); // ✅ added

export const updateTask = (id: number, data: { user_ids: number[] }) =>
  API.put(`/tasks/${id}`, data); // ✅ added

export const getMyTasks = (userId: number) => API.get(`/users/${userId}/tasks`);

export const updateTaskStatus = (id: number, status: string) =>
  API.patch(`/tasks/${id}/status`, { status });
