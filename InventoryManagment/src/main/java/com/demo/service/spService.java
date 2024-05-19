package com.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.supplier;
import com.demo.repository.spRepository;

@Service
public class spService {
    @Autowired
    private spRepository spRepo;

    public void save(supplier sp){
        spRepo.save(sp);
    }

    public List<supplier> supplierList(){
        return spRepo.findAll();
    }
    
    public supplier getSpById(int id){
        return spRepo.findById(id).get();
    }

    public void deleteById(int id){
        spRepo.deleteById(id);
    }
    public supplier update(supplier sp, Integer id){
        supplier objsp = spRepo.findById(id).get();
        objsp.setId(sp.getId());
        objsp.setName(sp.getName());
        objsp.setAddress(sp.getAddress());
        objsp.setGstNo(sp.getGstNo());
        objsp.setPhone(sp.getPhone());
        objsp.setPincode(sp.getPincode());

        return spRepo.save(objsp);
    }

    public List<supplier> getAllCustomer() {
       return spRepo.findAll();
    }

    public int getLastId(){
        supplier lastId = spRepo.findTopByOrderByIdDesc();
        if(lastId != null){
            System.out.println("Id in Service" +lastId.getId()+1);
            return lastId.getId() + 1;
        }else{
            System.out.println("Id in Service 1");
            return 1;
        }
    }
}
