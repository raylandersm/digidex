package com.example.digidex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "digimon_move_variant")
@Getter
@Setter
public class DigimonMoveVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private DigimonMove digimonMove;

    @ManyToOne
    private MoveVariant moveVariant;
}