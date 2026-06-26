package com.example.digidex.entity;

import com.example.digidex.enums.MoveAttribute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "move_effect")
@Getter
@Setter
public class MoveEffect {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private MoveVariant moveVariant;

    private Integer chance;

    @ManyToOne
    private StatusEffect effect;

    @Enumerated(EnumType.STRING)
    private MoveAttribute vulnerableTo;

    private Integer bonusDamagePercent;

    @Enumerated(EnumType.STRING)
    private MoveAttribute removedBy;
}
