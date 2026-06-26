package com.example.digidex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "status_effect")
@Getter
@Setter
public class StatusEffect {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String description;

    private Integer duration;

    private Boolean stackable;

    @OneToMany(mappedBy = "effect")
    private List<MoveEffect> moveEffects = new ArrayList<>();
}
