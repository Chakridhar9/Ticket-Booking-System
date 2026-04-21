import { useState } from "react";

function CancelBooking() {

  const [id, setId] = useState("");

  const cancel = async () => {
    const res = await fetch(`http://localhost:8082/booking/cancel/${id}`, {
      method: "DELETE"
    });

    if (res.ok) alert("❌ Booking cancelled");
  };

  return (
    <div style={styles.box}>
      <h3>Cancel Booking</h3>

      <input placeholder="Booking ID"
        onChange={(e)=>setId(e.target.value)} />

      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default CancelBooking;

const styles = {
  box: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc"
  }
};