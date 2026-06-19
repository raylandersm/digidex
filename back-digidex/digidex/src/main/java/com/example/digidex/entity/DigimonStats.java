package com.example.digidex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter
@Entity
@Table(name = "digimon_stats")
public class DigimonStats {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Integer hp;
    private Integer sp;
    private Integer atk;
    private Integer def;
    private Integer intel;
    private Integer spi;
    private Integer spd;
}
