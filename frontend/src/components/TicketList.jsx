import { useState } from "react";

function TicketList({ tickets, onBook }) {

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleBooking = () => {
    onBook(selectedTicket.id, quantity);
    setSelectedTicket(null);
    setQuantity(1);
  };

  return (
    <div style={styles.grid}>

      {tickets.map(t => (
        <div key={t.id} style={styles.card}>
          <h3>{t.eventName}</h3>
          <p>Seats: {t.availableSeats}</p>
          <p>Price: ₹ {t.price}</p>

          <button onClick={() => setSelectedTicket(t)}>
            Book
          </button>
        </div>
      ))}

      {/* 🔥 Booking Popup */}
      {selectedTicket && (
        <div style={styles.popup}>
          <div style={styles.modal}>

            <h3>{selectedTicket.eventName}</h3>

            <p>Price per ticket: ₹ {selectedTicket.price}</p>

            <input
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <p>
              Total Price: ₹ {selectedTicket.price * quantity}
            </p>

            <button onClick={handleBooking}>
              Confirm Booking
            </button>

            <button onClick={() => setSelectedTicket(null)}>
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default TicketList;

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  }
};