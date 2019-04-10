package com.msi.CarsMechanic.CarsMechanic.Workshop.Entity;

import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;

import javax.persistence.*;

@Entity
public class Workshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @ManyToOne(cascade= CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User owner;


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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
