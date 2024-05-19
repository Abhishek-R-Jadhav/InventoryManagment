package com.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.demo.entity.customer;
import com.demo.service.customerService;

 
@Controller
public class custumerController {
    
    @Autowired
    private customerService customServ;

    @GetMapping("/customer")
    public String showCreatedCustomeForm(Model model){
        int nextCustomId = customServ.getLastId();
        List<customer> cust = customServ.getAllCustomer();
        System.out.println(nextCustomId);
        model.addAttribute("nextCustomId", nextCustomId);
        model.addAttribute("customer", cust);

        return "customerMaster";
    }

    @GetMapping("/editCustomer/{id}")
    public String editCust(@PathVariable("id") int id, Model model){
        customer cust = customServ.getCustById(id);
        model.addAttribute("customer", cust);
        System.out.println(cust);
        return "editCustomer";
    }

    @PostMapping("/saveCustomer")
    public String saveCustomer(@ModelAttribute customer c){
        customServ.save(c);
        return "redirect:/customer";
    }

    @RequestMapping("/update")
    public String updateCustomer(@ModelAttribute customer c){
        int cid = c.getId();
        customServ.update(c, cid);
        return "redirect:/customer";
    }

    @RequestMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable("id") int id){
        customServ.deleteCust(id);
        return "redirect:/customer";

    }
}
