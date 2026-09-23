package com.example.civicpulsebackend.certificate.controller;

import com.example.civicpulsebackend.certificate.entity.Application;
import com.example.civicpulsebackend.certificate.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository repository;

    @GetMapping
    public List<Application> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Application create(@RequestBody Application entity) {
        return repository.save(entity);
    }
}
