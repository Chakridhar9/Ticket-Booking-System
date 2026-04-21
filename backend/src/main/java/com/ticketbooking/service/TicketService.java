package com.ticketbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ticketbooking.model.Ticket;
import com.ticketbooking.repository.TicketRepository;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepo;

    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    public Ticket save(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    public void delete(Long id) {
        ticketRepo.deleteById(id);
    }

    // 🔍 SEARCH METHOD (must be inside class)
    public List<Ticket> searchTickets(String name) {
        return ticketRepo.findByEventNameContainingIgnoreCase(name);
    }

    // ✏️ UPDATE METHOD (add this also)
    public Ticket updateTicket(Long id, Ticket updatedTicket) {

        Ticket ticket = ticketRepo.findById(id).orElse(null);

        if (ticket == null) {
            throw new RuntimeException("Ticket not found");
        }

        ticket.setEventName(updatedTicket.getEventName());
        ticket.setAvailableSeats(updatedTicket.getAvailableSeats());
        ticket.setPrice(updatedTicket.getPrice());

        return ticketRepo.save(ticket);
    }
}