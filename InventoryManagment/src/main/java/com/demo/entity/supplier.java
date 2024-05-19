package com.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String address;
    private String gstNo;
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
    public String getGstNo() {
        return gstNo;
    }
    public void setGstNo(String gstNo) {
        this.gstNo = gstNo;
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
    public supplier() {
    }
    public supplier(int id, String name, String address, String gstNo, String phone,
            String pincode) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.gstNo = gstNo;
        this.phone = phone;
        this.pincode = pincode;
    }
    @Override
    public String toString() {
        return "supplier [id=" + id + ", name=" + name + ", address=" + address + ", gstNo=" + gstNo + ", phone=" + phone + ", pincode=" + pincode + "]";
    }

    

    

}
