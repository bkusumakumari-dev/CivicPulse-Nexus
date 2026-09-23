package com.example.civicpulsebackend.citizen.repository;

import com.example.civicpulsebackend.citizen.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface GrievanceRepository extends JpaRepository<Grievance, UUID> {
}
