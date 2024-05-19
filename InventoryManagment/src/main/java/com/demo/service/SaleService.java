package com.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.sale;
import com.demo.repository.SaleRepository;

@Service
public class SaleService {
    @Autowired
    SaleRepository saleRepo;

    public void save(sale sale){
        saleRepo.save(sale);
    }

    public List<sale> allSales(){
        return saleRepo.findAll();
    }

    public sale getById(int id){
        return saleRepo.findById(id).get();
    }

    public void deleteById(int id){
        saleRepo.deleteById(id);
    }
    public int getLastId(){
        sale lastId = saleRepo.findTopByOrderByIdDesc();
        if(lastId != null){
            return lastId.getId() + 1;
        }
        else{
            return 1;
        }
    }
}
