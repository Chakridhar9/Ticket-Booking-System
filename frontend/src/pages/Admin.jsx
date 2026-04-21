import { useState } from "react";

function Admin() {

  const [eventName, setEventName] = useState("");
  const [availableSeats, setSeats] = useState("");
  const [price, setPrice] = useState("");

  const addTicket = async () => {
    const res = await fetch("http://localhost:8082/tickets/admin/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        eventName,
        availableSeats: parseInt(availableSeats),
        price: parseFloat(price)
      })
    });

    if (res.ok) alert("✅ Ticket added");
  };

  return (
    <div style={styles.container}>
      <h1>Admin Panel</h1>

      <div style={styles.card}>
        <input style={styles.input} placeholder="Event"
          onChange={(e)=>setEventName(e.target.value)} />

        <input style={styles.input} placeholder="Seats"
          onChange={(e)=>setSeats(e.target.value)} />

        <input style={styles.input} placeholder="Price"
          onChange={(e)=>setPrice(e.target.value)} />

        <button style={styles.button} onClick={addTicket}>
          Add Ticket
        </button>
      </div>
    </div>
  );
}

export default Admin;

const styles = {
  container: { textAlign: "center", padding: "20px" },
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
    margin: "10px 0"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none"
  }
};