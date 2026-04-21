import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {

  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    console.log("Logout triggered");
    setUser(null);
    setShowRegister(false);
  };

  return (
    <>
      {!user ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>🎟 Ticket Booking System</h1>

          {showRegister ? (
            <>
              <Register />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowRegister(false)}>Login</button>
              </p>
            </>
          ) : (
            <>
              <Login setUser={setUser} />
              <p>
                New user?{" "}
                <button onClick={() => setShowRegister(true)}>Register</button>
              </p>
            </>
          )}
        </div>
      ) : user.role === "ADMIN" ? (
        <Admin onLogout={handleLogout} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;