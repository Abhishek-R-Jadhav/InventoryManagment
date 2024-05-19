package com.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.entity.customer;

@Repository
public interface customerRepository extends JpaRepository<customer, Integer>{
    
    @Query(value = "SELECT c.c_id FROM Customer c ORDER BY c.id DESC LIMIT 1", nativeQuery = true)
    String findTopCId();

    String findByName(String name);

    customer findTopByOrderByIdDesc();
}
