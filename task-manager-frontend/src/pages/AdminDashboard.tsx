import React, { useState, useEffect } from "react";
import { getUsers, createTask } from "../api";

export default function AdminDashboard({ user }: { user: any }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  useEffect(() => {
    getUsers().then(res => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      alert("Missing admin ID");
      return;
    }
    await createTask({
      title,
      description,
      status,
      user_ids: selectedEmployees,
      admin_id: user.id,   // ✅ include admin ID here
    });
    alert("Task created and assigned!");
    // reset form
    setTitle("");
    setDescription("");
    setStatus("pending");
    setSelectedEmployees([]);
  };

  return (
    <div>
      <h2>Welcome Admin {user?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <h3>Assign to Employees:</h3>
        {employees.map(emp => (
          <label key={emp.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              value={emp.id}
              checked={selectedEmployees.includes(emp.id)}
              onChange={(e) => {
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
    </div>
  );
}
