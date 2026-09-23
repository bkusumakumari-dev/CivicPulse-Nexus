package com.example.civicpulsebackend.certificate.repository;

import com.example.civicpulsebackend.certificate.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
}
