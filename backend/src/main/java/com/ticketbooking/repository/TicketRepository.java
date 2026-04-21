package com.ticketbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketbooking.model.Ticket;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // 🔍 Search tickets by event name
    List<Ticket> findByEventNameContainingIgnoreCase(String eventName);
}