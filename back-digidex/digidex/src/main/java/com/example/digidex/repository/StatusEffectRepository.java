package com.example.digidex.repository;

import com.example.digidex.entity.StatusEffect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StatusEffectRepository
        extends JpaRepository<StatusEffect, UUID> {
}
