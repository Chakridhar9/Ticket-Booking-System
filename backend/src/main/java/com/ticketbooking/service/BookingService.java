package com.ticketbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketbooking.model.*;
import com.ticketbooking.repository.*;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private TicketRepository ticketRepo;

    // 🔹 BOOK TICKET WITH VALIDATION
    public Booking bookTicket(Booking booking) {

        if (booking == null) {
            throw new RuntimeException("Booking data is missing");
        }

        if (booking.getTicketId() == null) {
            throw new RuntimeException("Ticket ID is required");
        }

        if (booking.getUserId() == null) {
            throw new RuntimeException("User ID is required");
        }

        if (booking.getQuantity() <= 0) {
            throw new RuntimeException("Invalid quantity. Must be greater than 0");
        }

        Ticket ticket = ticketRepo.findById(booking.getTicketId())
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (ticket.getAvailableSeats() < booking.getQuantity()) {
            throw new RuntimeException("Not enough seats available");
        }

        // ✅ Reduce seats
        ticket.setAvailableSeats(ticket.getAvailableSeats() - booking.getQuantity());
        ticketRepo.save(ticket);

        // ✅ Save booking
        return bookingRepo.save(booking);
    }

    // 🔹 CANCEL BOOKING WITH VALIDATION
    public void cancelBooking(Long id) {

        if (id == null) {
            throw new RuntimeException("Booking ID is required");
        }

        Booking booking = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Ticket ticket = ticketRepo.findById(booking.getTicketId())
                .orElseThrow(() -> new RuntimeException("Associated ticket not found"));

        // ✅ Restore seats
        ticket.setAvailableSeats(ticket.getAvailableSeats() + booking.getQuantity());
        ticketRepo.save(ticket);

        // ✅ Delete booking
        bookingRepo.delete(booking);
    }

    // 🔹 GET BOOKINGS BY USER
    public List<Booking> getBookingsByUser(Long userId) {

        if (userId == null) {
            throw new RuntimeException("User ID is required");
        }

        List<Booking> bookings = bookingRepo.findByUserId(userId);

        if (bookings.isEmpty()) {
            throw new RuntimeException("No bookings found for this user");
        }

        return bookings;
    }
}