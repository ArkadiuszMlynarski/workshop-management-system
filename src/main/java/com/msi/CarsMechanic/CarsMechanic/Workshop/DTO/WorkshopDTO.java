package com.msi.CarsMechanic.CarsMechanic.Workshop.DTO;

public class WorkshopDTO {


    private String name;

    private String address;

    private Long owner;

    public WorkshopDTO() {
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

    public Long getOwner() {
        return owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }
}
