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
import com.demo.entity.sale;
import com.demo.service.SaleService;
import com.demo.service.customerService;

@Controller
public class SaleController {
    
    @Autowired
    private customerService custServSales;
    @Autowired
    private SaleService saleServ;

    @GetMapping("/sales")
    public String showCustomerForm(Model model) {
        List<customer> customers = custServSales.getAllCustomer();
        model.addAttribute("customers", customers);
        List<sale> sale = saleServ.allSales();
        model.addAttribute("sales", sale);
        int nextId = saleServ.getLastId();
        model.addAttribute("nextId", nextId);
        return "sale";
    }

    @PostMapping("/saveSale")
    public String saveSale(@ModelAttribute sale s){
        saleServ.save(s);
        return "redirect:/sales";
    }

    @GetMapping("/editSale/{id}")
    public String editSale(@PathVariable("id") int id, Model model){
        sale getSale = saleServ.getById(id);
        model.addAttribute("getSale", getSale);
        List<customer> customers = custServSales.getAllCustomer();
        model.addAttribute("customers", customers);
        return "EditSale";
    }

    @RequestMapping("/deleteSale/{id}")
    public String deleteSale(@PathVariable("id") int id){
        saleServ.deleteById(id);
        return "redirect:/sales";
    }

}
