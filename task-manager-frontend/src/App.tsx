import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [user, setUser] = useState<any>(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {!user ? (
        <>
          {showRegister ? (
            <RegisterForm onRegister={() => setShowRegister(false)} />
          ) : (
            <LoginForm onLogin={setUser} />
          )}
          <button onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? "Back to Login" : "Create Account"}
          </button>
        </>
      ) : (
        <h2>Welcome, {user.name} ({user.role})</h2>
      )}
    </div>
  );
}

export default App;
