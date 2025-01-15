package com.campus_mobile.agroconnect.repository;

import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(UserRole role);
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
    void deleteById(UUID id);
}