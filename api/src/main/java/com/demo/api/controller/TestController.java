package com.demo.api.controller;

import com.demo.api.auth.model.User;
import com.demo.api.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestController {

    private final AuthService authService;

    // Public - no auth required
    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("This is a public endpoint. No authentication required.");
    }

    // USER OR ADMIN
    @GetMapping("/user-or-admin")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> userOrAdminAccess() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok("Hello " + currentUser.getUsername() + ", your role: " + currentUser.getRole());
    }

    // USER ONLY
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> userAccess() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok("Hello user " + currentUser.getUsername() + ", your role: " + currentUser.getRole());
    }

    // ADMIN ONLY
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminAccess() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok("Hello admin " + currentUser.getUsername() + ", your role: " + currentUser.getRole());
    }

    // Accessible by both USER and ADMIN (same as user-or-admin)
    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> allAccess() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok("Hello " + currentUser.getUsername() + ", your role: " + currentUser.getRole());
    }
}
