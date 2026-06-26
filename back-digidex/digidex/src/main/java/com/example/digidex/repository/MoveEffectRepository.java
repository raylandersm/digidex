package com.example.digidex.repository;

import com.example.digidex.entity.MoveEffect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MoveEffectRepository
        extends JpaRepository<MoveEffect, UUID> {
}