package com.example.digidex.entity;

import com.example.digidex.enums.DigimonAttribute;
import com.example.digidex.enums.MoveAttribute;
import com.example.digidex.enums.MoveCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Getter
@Setter
@Entity
@Table(name = "digimon_move")
public class DigimonMove {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore
    @ManyToOne
    private Digimon digimon;

    @ManyToOne
    private Move move;

    @Enumerated(EnumType.STRING)
    private MoveCategory type;
}