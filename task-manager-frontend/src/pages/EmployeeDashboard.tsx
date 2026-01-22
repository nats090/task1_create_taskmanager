import React, { useEffect, useState } from "react";
import { getMyTasks } from "../api";

export default function EmployeeDashboard({ user }: { user: any }) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getMyTasks(user.id).then(res => setTasks(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>Welcome Employee {user?.name}</h2>
      <h3>Your Tasks:</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
