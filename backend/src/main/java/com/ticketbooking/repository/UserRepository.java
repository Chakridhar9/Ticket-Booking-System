package com.ticketbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketbooking.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}