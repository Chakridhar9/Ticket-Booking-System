import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ user, onLogout }) {

  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getTickets = async () => {
    const res = await axios.get("http://localhost:8082/tickets");
    setTickets(res.data);
  };

  const getBookings = async () => {
    const res = await axios.get(`http://localhost:8082/booking/user/${user.id}`);
    setBookings(res.data);
  };

  useEffect(() => {
    getTickets();
    getBookings();
  }, []);

  const handleBooking = async () => {
    try {
      await axios.post("http://localhost:8082/booking/book", {
        userId: user.id,
        ticketId: selectedTicket.id,
        quantity: parseInt(quantity)
      });

      alert("✅ Booking successful");
      setSelectedTicket(null);
      setQuantity(1);

      getTickets();
      getBookings();

    } catch {
      alert("❌ Booking failed");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/booking/cancel/${id}`);
      alert("❌ Booking cancelled");

      getTickets();
      getBookings();

    } catch {
      alert("Cancel failed");
    }
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2>🎟 TicketHub</h2>

        <div>
          <span style={{ marginRight: "15px" }}>👤 {user.username}</span>

          <button
            onClick={() => {
              console.log("Clicked logout");
              onLogout();
            }}
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>Explore Events</h1>
        <p>Book tickets for concerts, movies, DJ nights & more</p>
      </div>

      {/* EVENTS */}
      <div style={styles.grid}>
        {tickets.map(t => (
          <div key={t.id} style={styles.card}>
            <h3>{t.eventName}</h3>
            <p style={styles.seats}>🎫 {t.availableSeats} seats left</p>
            <p style={styles.price}>₹ {t.price}</p>

            <button
              onClick={() => setSelectedTicket(t)}
              style={styles.bookBtn}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedTicket && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{selectedTicket.eventName}</h2>

            <p>Price: ₹ {selectedTicket.price}</p>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={styles.input}
            />

            <p>Total: ₹ {quantity * selectedTicket.price}</p>

            <div style={{ marginTop: "15px" }}>
              <button onClick={handleBooking} style={styles.confirmBtn}>
                Confirm
              </button>

              <button onClick={() => setSelectedTicket(null)} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKINGS */}
      <div style={styles.bookingSection}>
        <h2>Your Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <div style={styles.grid}>
            {bookings.map(b => (
              <div key={b.id} style={styles.card}>
                <p><b>ID:</b> {b.id}</p>
                <p>Ticket: {b.ticketId}</p>
                <p>Qty: {b.quantity}</p>

                <button
                  style={styles.cancelBtn}
                  onClick={() => cancelBooking(b.id)}
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#020617"
  },

  header: {
    textAlign: "center",
    margin: "30px 0"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    padding: "0 40px"
  },

  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center"
  },

  bookBtn: {
    background: "#ef4444",
    padding: "10px",
    color: "white",
    border: "none",
    borderRadius: "8px"
  },

  logoutBtn: {
    background: "#ef4444",
    padding: "8px 15px",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },

  cancelBtn: {
    background: "#ef4444",
    padding: "10px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px"
  },

  confirmBtn: {
    background: "#22c55e",
    padding: "10px",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "15px"
  },

  input: {
    padding: "10px",
    margin: "10px 0"
  },

  bookingSection: {
    marginTop: "50px",
    textAlign: "center"
  }
};