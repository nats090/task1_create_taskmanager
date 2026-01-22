import React, { useState, useEffect } from "react";
import { getUsers, createTask, getTasks, updateTask } from "../api";

export default function AdminDashboard({ user }: { user: any }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [assignEmployees, setAssignEmployees] = useState<number[]>([]);

  useEffect(() => {
    getUsers().then(res => setEmployees(res.data));
    getTasks().then(res => setTasks(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return alert("Missing admin ID");

    await createTask({
      title,
      description,
      status,
      admin_id: user.id,
      user_ids: selectedEmployees.length ? selectedEmployees : undefined, // optional
    });

    alert("Task created!");
    setTitle("");
    setDescription("");
    setStatus("pending");
    setSelectedEmployees([]);
    getTasks().then(res => setTasks(res.data));
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    await updateTask(selectedTask.id, { user_ids: assignEmployees });
    alert("Employees assigned!");
    setSelectedTask(null);
    setAssignEmployees([]);
    getTasks().then(res => setTasks(res.data));
  };

  return (
    <div>
      <h2>Welcome Admin {user?.name}</h2>

      <h3>Create Task</h3>
      <form onSubmit={handleCreate}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <h4>Assign Now (optional):</h4>
        {employees.map(emp => (
          <label key={emp.id}>
            <input
              type="checkbox"
              value={emp.id}
              checked={selectedEmployees.includes(emp.id)}
              onChange={e => {
                const id = Number(e.target.value);
                setSelectedEmployees(prev =>
                  prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                );
              }}
            />
            {emp.name} ({emp.email})
          </label>
        ))}
        <button type="submit">Create Task</button>
      </form>

      <h3>Existing Tasks</h3>
      {tasks.map(task => (
        <div key={task.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <strong>{task.title}</strong> — {task.status}
          <p>{task.description}</p>
          <button onClick={() => {
            setSelectedTask(task);
            setAssignEmployees(task.users.map((u: any) => u.id));
          }}>
            Assign Employees
          </button>
        </div>
      ))}

      {selectedTask && (
        <form onSubmit={handleAssign}>
          <h4>Assign to: {selectedTask.title}</h4>
          {employees.map(emp => (
            <label key={emp.id}>
              <input
                type="checkbox"
                value={emp.id}
                checked={assignEmployees.includes(emp.id)}
                onChange={e => {
                  const id = Number(e.target.value);
                  setAssignEmployees(prev =>
                    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                  );
                }}
              />
              {emp.name}
            </label>
          ))}
          <button type="submit">Update Assignment</button>
        </form>
      )}
    </div>
  );
}
