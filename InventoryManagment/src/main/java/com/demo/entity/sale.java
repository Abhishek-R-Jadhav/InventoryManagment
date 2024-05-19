package com.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String customerName;
    private String address;
    private String phone;
    private float weight;
    private BigDecimal amount;
    private BigDecimal total;
    private BigDecimal paidAmount;
    private BigDecimal remainingAmount;

    @Override
    public String toString() {
        return "Sale{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", weight=" + weight +
                ", amount=" + amount +
                ", total=" + total +
                ", paidAmount=" + paidAmount +
                ", remainingAmount=" + remainingAmount +
                '}';
    }
}
