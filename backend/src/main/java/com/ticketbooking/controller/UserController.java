package com.ticketbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ticketbooking.model.User;
import com.ticketbooking.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepo.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User u = userRepo.findByUsername(user.getUsername());

        if (u != null && u.getPassword().equals(user.getPassword())) {
            return u;
        }
        return null;
    }
}