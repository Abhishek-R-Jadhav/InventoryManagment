package com.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.customer;
import com.demo.repository.customerRepository;

@Service
public class customerService {
    
    @Autowired
    private customerRepository cusomRepo;

    public void save(customer c){
        cusomRepo.save(c);
    }

    public List<customer> getAllCustomer(){
        return cusomRepo.findAll();
    }

    public void deleteCust(int id){
        cusomRepo.deleteById(id);
    }

    public customer getCustById(int id){
        return cusomRepo.findById(id).get();
    }

    public customer update(customer c, Integer id){
        customer objcust = cusomRepo.findById(id).get();
        objcust.setId(c.getId());
        objcust.setName(c.getName());
        objcust.setAddress(c.getAddress());
        objcust.setPincode(c.getPincode());
        objcust.setPhone(c.getPhone());

        return cusomRepo.save(objcust);
    }

    public String getByName(String name) {
        return cusomRepo.findByName(name);
    }

    public void deleteById(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }
    
    public int getLastId(){
        customer lastId = cusomRepo.findTopByOrderByIdDesc();
        if(lastId != null){
            return lastId.getId() + 1;
        }else{
            return 1;
        }
    }
}
