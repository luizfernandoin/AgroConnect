package com.campus_mobile.agroconnect.model;

import com.campus_mobile.agroconnect.utils.validation.constraints.AtLeastOne;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.br.CNPJ;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, length = 100)
    @NotBlank
    private String name;

    @Email
    @Column(name = "email", nullable = false, unique = true, length = 255)
    @NotBlank
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    @NotBlank
    private String password;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "phone", length = 20)
    private String phone;

    @CPF
    @Column(name = "cpf", unique = true, length = 11)
    private String cpf;

    @CNPJ
    @Column(name = "cnpj", unique = true, length = 14)
    private String cnpj;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

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

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_PRODUCER"),
                    new SimpleGrantedAuthority("ROLE_CUSTOMER")
            );
        } else if (this.role == UserRole.PRODUCER) {
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
    public String getUsername() {
        return "";
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
