package com.example.digidex.repository;

import com.example.digidex.entity.Move;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MoveRepository extends JpaRepository<Move, UUID> {

    Optional<Move> findByNameIgnoreCase(String name);

}