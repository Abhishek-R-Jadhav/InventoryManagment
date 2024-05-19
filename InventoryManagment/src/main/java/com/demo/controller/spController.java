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
import org.springframework.web.servlet.ModelAndView;

import com.demo.entity.supplier;
import com.demo.service.spService;

@Controller
public class spController {

    @Autowired
    private spService spServ;

    @GetMapping({"","/"})
    public String home(){
        return "index";
    }

    @GetMapping("/supplier")
public ModelAndView getAllSp(){ 
    int nextId = spServ.getLastId();
    System.out.println(nextId);
    List<supplier> sp = spServ.supplierList();
    ModelAndView modelAndView = new ModelAndView("supplierMaster");
    modelAndView.addObject("supplier", sp);
    modelAndView.addObject("nextId", nextId);
    return modelAndView;
}

    //@GetMapping("/supplier")
    //public ModelAndView getAllSp(){
      //  List<supplier> sp = spServ.supplierList();
       // return new ModelAndView("supplierMaster", "supplier", sp);
    //}

    @PostMapping("/save")
    public String addSp(@ModelAttribute supplier sp){
        spServ.save(sp);
        return "redirect:/supplier";
    }

    @GetMapping("/editSupplier/{id}")
    public String editSp(@PathVariable("id") int id, Model model){
        supplier sp = spServ.getSpById(id);
        model.addAttribute("supplier", sp);
        return "editSupplier";
    }

    @RequestMapping("/deleteSp/{id}")
    public String deleteSp(@PathVariable("id") int id){
        spServ.deleteById(id);
        return "redirect:/supplier";

    }
}
