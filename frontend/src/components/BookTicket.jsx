function BookTicket() {
  return (
    <div style={styles.box}>
      <h3>Quick Booking</h3>
      <p>Select ticket and click Book</p>
    </div>
  );
}

export default BookTicket;

const styles = {
  box: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc"
  }
};