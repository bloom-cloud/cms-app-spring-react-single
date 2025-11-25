package com.demo.api.auth.repo;

import com.demo.api.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByProviderId(String providerId);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
