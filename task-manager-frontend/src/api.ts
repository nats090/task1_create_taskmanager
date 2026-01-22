import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const login = (data: { email: string; password: string }) =>
  API.post("/login", data);

export const logout = () => API.post("/logout");

export const getUsers = () => API.get("/users");

export const createTask = (data: {
  title: string;
  description: string;
  status: string;
  user_ids: number[];
}) => API.post("/tasks", data);

export const getMyTasks = (userId: number) => API.get(`/my-tasks/${userId}`);

export const updateTaskStatus = (id: number, status: string) =>
  API.patch(`/tasks/${id}/status`, { status });
