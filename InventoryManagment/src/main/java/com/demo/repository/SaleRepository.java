package com.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.lang.Integer;
import com.demo.entity.sale;


@Repository
public interface SaleRepository extends JpaRepository<sale, Integer> {

    sale findTopByOrderByIdDesc();
}
