package com.example.digidex.repository;

import com.example.digidex.entity.MoveVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MoveVariantRepository
        extends JpaRepository<MoveVariant, UUID> {
}