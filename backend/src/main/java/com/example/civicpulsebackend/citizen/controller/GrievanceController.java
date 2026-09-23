package com.example.civicpulsebackend.citizen.controller;

import com.example.civicpulsebackend.citizen.entity.Grievance;
import com.example.civicpulsebackend.citizen.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceRepository repository;

    @GetMapping
    public List<Grievance> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Grievance create(@RequestBody Grievance entity) {
        return repository.save(entity);
    }
}
