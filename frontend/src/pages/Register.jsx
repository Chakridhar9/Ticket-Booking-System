import { useState } from "react";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8082/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: "USER" })
      });

      if (!res.ok) throw new Error("Registration failed");

      alert("✅ Registered successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <input style={styles.input} placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input style={styles.input} type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;

const styles = {
  container: { marginTop: "20px" },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    margin: "auto",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
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
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px"
  }
};