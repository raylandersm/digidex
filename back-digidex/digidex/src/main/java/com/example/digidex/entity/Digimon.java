package com.example.digidex.entity;

import com.example.digidex.enums.DigimonAttribute;
import com.example.digidex.enums.DigimonType;
import com.example.digidex.enums.Level;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
public class Digimon {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Enumerated(EnumType.STRING)
    private DigimonAttribute digimonAttribute;

    @Enumerated(EnumType.STRING)
    private DigimonType type;

    private String imageUrl;

    private String evolutionCondition;

    @OneToMany(
            mappedBy = "digimon",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<DigimonMove> digimonMoves;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "digimon_previous_evolution",
            joinColumns = @JoinColumn(name = "digimon_id"),
            inverseJoinColumns = @JoinColumn(name = "previous_digimon_id")
    )
    private List<Digimon> previousEvolutions;

    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "base_stats_id")
    private DigimonStats stats;

    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "max_stats_id")
    private DigimonStats maxStats;
}