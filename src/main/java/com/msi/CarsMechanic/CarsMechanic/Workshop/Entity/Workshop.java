package com.msi.CarsMechanic.CarsMechanic.Workshop.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Workshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, unique = true)
    private Long id;

    @Column
    @NotBlank(message = "Workshop name is required")
    private String name;

    @Column
    @NotBlank(message = "Description is required")
    private String description;

    @Column
    @NotBlank(message = "Workshop address is required")
    private String address;

    @Column
    @NotNull(message = "Workshop telephone number is required")
    private Long telephone;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean accepted;

    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd\nHH:mm:ss")
    private LocalDateTime creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;


    private String owner;

    public Workshop() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getAccepted() { return accepted; }

    public void setAccepted(Boolean accepted) { this.accepted = accepted;  }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTelephone() {
        return telephone;
    }

    public void setTelephone(Long telephone) {
        this.telephone = telephone;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
