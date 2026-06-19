package com.example.digidex.entity;

import com.example.digidex.enums.MoveAttribute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter
@Entity
@Table(name = "move")
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer accuracy;

    private Integer power;

    private Integer spCost;

    @Enumerated(EnumType.STRING)
    private MoveAttribute attribute;
}