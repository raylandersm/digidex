package com.example.digidex.repository;

import com.example.digidex.entity.Digimon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DigimonRepository
        extends JpaRepository<Digimon, UUID> {

    List<Digimon> findByPreviousEvolutionsContaining(
            Digimon digimon
    );
}