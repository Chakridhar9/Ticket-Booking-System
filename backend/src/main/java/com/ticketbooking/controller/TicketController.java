package com.ticketbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ticketbooking.model.Ticket;
import com.ticketbooking.service.TicketService;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    // 🔹 GET all tickets
    @GetMapping
    public List<Ticket> getAll() {
        return ticketService.getAllTickets();
    }

    // 🔹 ADD ticket (Admin)
    @PostMapping("/admin/add")
    public Ticket add(@RequestBody Ticket ticket) {
        return ticketService.save(ticket);
    }

    // 🔹 DELETE ticket (Admin)
    @DeleteMapping("/admin/delete/{id}")
    public void delete(@PathVariable Long id) {
        ticketService.delete(id);
    }

    // 🔍 SEARCH tickets by event name
    @GetMapping("/search")
    public List<Ticket> search(@RequestParam String name) {
        return ticketService.searchTickets(name);
    }

    // ✏️ UPDATE ticket
    @PutMapping("/admin/update/{id}")
    public Ticket update(@PathVariable Long id, @RequestBody Ticket ticket) {
        return ticketService.updateTicket(id, ticket);
    }
}