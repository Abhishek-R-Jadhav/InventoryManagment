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

import com.demo.entity.purchase;
import com.demo.entity.supplier;
import com.demo.service.purchaseService;
import com.demo.service.spService;

@Controller
public class PurchaseController {
    @Autowired
    spService spServ;
    @Autowired
    purchaseService purchaseServ;

    @GetMapping("/purchase")
    public String showFrmPurchase(Model model){
        //for displaying name of suppliers in dropdown
        List<supplier> suppliers = spServ.getAllCustomer();
        model.addAttribute("suppliers", suppliers);
        //for generate next id
        int nextId = purchaseServ.getLastId();
        model.addAttribute("nextId", nextId);
        //for displaying all records in table
        List<purchase> purchases = purchaseServ.purchaseList();
        model.addAttribute("purchase", purchases);
        return "purchase";
    }

    @PostMapping("/savePurchase")
    public String save(@ModelAttribute purchase p){
        purchaseServ.save(p);
        return "redirect:/purchase";
    }

    @RequestMapping("/editPurchase/{id}")
    public String editPurchase(@PathVariable("id") int id, Model model){
        purchase getPurchase = purchaseServ.getById(id);
        model.addAttribute("getPurchase", getPurchase);
        List<supplier> suppliers = spServ.getAllCustomer();
        model.addAttribute("suppliers", suppliers);
        return "editPurchase";
    }

    @RequestMapping("/deletePurchase/{id}")
    public String delete(@PathVariable("id") int id){
        purchaseServ.deleteById(id);
        return "redirect:/purchase";
    }
}
