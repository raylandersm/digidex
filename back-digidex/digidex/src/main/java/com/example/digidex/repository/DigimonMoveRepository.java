package com.example.digidex.repository;

import com.example.digidex.entity.DigimonMove;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DigimonMoveRepository extends JpaRepository<DigimonMove, UUID> {
}