const BASE_URL = "http://localhost:8082";

// USERS
export const registerUser = (data) =>
  fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const loginUser = (data) =>
  fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

// TICKETS
export const getTickets = () =>
  fetch(`${BASE_URL}/tickets`);

export const addTicket = (data) =>
  fetch(`${BASE_URL}/tickets/admin/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

// BOOKING
export const bookTicket = (data) =>
  fetch(`${BASE_URL}/booking/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const cancelBooking = (id) =>
  fetch(`${BASE_URL}/booking/cancel/${id}`, {
    method: "DELETE"
  });

export const getUserBookings = (userId) =>
  fetch(`${BASE_URL}/booking/user/${userId}`);