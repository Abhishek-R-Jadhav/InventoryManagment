package com.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.lang.Integer;
import com.demo.entity.supplier;

@Repository
public interface spRepository extends JpaRepository<supplier, Integer> {
    supplier findTopByOrderByIdDesc();
}
