import { useState } from "react";

function Login({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8082/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      setUser(data);

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h1 style={styles.title}>🎟 Ticket Booking</h1>
        <h2 style={styles.subtitle}>Login</h2>

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.footer}>Welcome back 👋</p>
      </div>

    </div>
  );
}

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: "10px"
  },
  subtitle: {
    marginBottom: "20px",
    color: "#555"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#777"
  }
};