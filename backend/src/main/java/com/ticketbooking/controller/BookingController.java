package com.ticketbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ticketbooking.model.Booking;
import com.ticketbooking.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // ✅ Book ticket
    @PostMapping("/book")
    public Booking book(@RequestBody Booking booking) {
        return bookingService.bookTicket(booking);
    }

    // ✅ Cancel booking
    @DeleteMapping("/cancel/{id}")
    public String cancel(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return "Booking Cancelled";
    }

    // ✅ NEW: Get bookings by user
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
}