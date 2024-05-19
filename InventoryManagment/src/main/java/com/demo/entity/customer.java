package com.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String address;
    private String phone;
    private String pincode;

    public int getId() {
        return id;
    }
    public void setId(int id) {
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
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getPincode() {
        return pincode;
    }
    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
    public customer() {
    }
    public customer(int id, String name, String address, String phone,
            String pincode) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.pincode = pincode;
    }
    @Override
    public String toString() {
        return "supplier [id=" + id + ", name=" + name + ", address=" + address + ", phone=" + phone + ", pincode=" + pincode + "]";
    }

    

    

}
