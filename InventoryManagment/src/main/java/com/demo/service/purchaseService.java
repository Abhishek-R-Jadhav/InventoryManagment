package com.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.purchase;
import com.demo.repository.purchaseRepository;

@Service
public class purchaseService {
    @Autowired
    purchaseRepository purchaseRepo;

    public void save(purchase purchase){
        purchaseRepo.save(purchase);
    }

    public List<purchase> purchaseList(){
        return purchaseRepo.findAll();
    }

    public purchase getById(int id){
        return purchaseRepo.findById(id).get();
    }

    public void deleteById(int id){
        purchaseRepo.deleteById(id);
    }

    public int getLastId(){
        purchase lastId = purchaseRepo.findTopByOrderByIdDesc();
        if (lastId != null) {
            return lastId.getId() + 1;
        }else{
            return 1;
        }
    }
}
