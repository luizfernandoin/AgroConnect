package com.campus_mobile.agroconnect.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity(name = "users")
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "cpf", unique = true, length = 11)
    private String cpf;

    @Column(name = "cnpj", unique = true, length = 14)
    private String cnpj;

    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt;

    public User(String name, String email, String password, String image, String phone, String cpf, String cnpj, UserRole role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.phone = phone;
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == UserRole.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_PRODUCER"),
                    new SimpleGrantedAuthority("ROLE_CUSTOMER")
            );
        } else if (role == UserRole.PRODUCER) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_PRODUCER"),
                    new SimpleGrantedAuthority("ROLE_CUSTOMER"));
        } else {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_CUSTOMER")
            );
        }
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
