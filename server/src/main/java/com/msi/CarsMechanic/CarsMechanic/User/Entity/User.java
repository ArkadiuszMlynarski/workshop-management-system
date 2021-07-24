package com.msi.CarsMechanic.CarsMechanic.User.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Table(name= "userr")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username need to be an email")
    @NotBlank(message = "Username is required")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Please enter your full name")
    private String fullName;

    @NotBlank(message = "Password field is required")
    private String password;

    @Transient
    private String confirmPassword;
    @JsonFormat(pattern = "yyyy-MM-dd\nHH:mm:ss", timezone = "Europe/Belgrade")
    private Date create_At;
    @JsonFormat(pattern = "yyyy-MM-dd\nHH:mm:ss", timezone = "Europe/Belgrade")
    private Date update_At;

    //OneToMany with Issue
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    private List<Issue> issues = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade=CascadeType.PERSIST)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Role> roles = new ArrayList<>();

    //OneToMany with Workshop
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Workshop> workshops = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private List<Opinion> opinions = new ArrayList<>();

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public List<Role> addRole(Role role) {
        if(roles == null){
            roles = new ArrayList<>();
        }

        roles.add(role);
        return roles;
    }
    public User() {
    }

    public List<Opinion> getOpinions() {
        return opinions;
    }

    public void setOpinions(List<Opinion> opinions) {
        this.opinions = opinions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    public List<Issue> getIssues() {
        return issues;
    }

    public void setIssues(List<Issue> issues) {
        this.issues = issues;
    }

    public List<Workshop> getWorkshops() { return workshops; }

    public void setWorkshops(List<Workshop> workshops) { this.workshops = workshops; }

    @PrePersist
    protected void onCreate() { this.create_At = new Date(); }

    @PreUpdate
    protected void onUpdate() { this.update_At = new Date(); }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
