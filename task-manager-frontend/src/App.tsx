import React, { useState } from "react";
import LoginForm from "./components/LoginForm";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null); // ✅ Type added

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <h2>Welcome, {user.name} ({user.role})</h2>
      )}
    </div>
  );
}

export default App;
