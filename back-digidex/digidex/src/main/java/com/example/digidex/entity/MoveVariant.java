package com.example.digidex.entity;

import com.example.digidex.entity.Move;
import com.example.digidex.enums.MoveAttribute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "move_variant")
@Getter
@Setter
public class MoveVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private Move move;

    @Enumerated(EnumType.STRING)
    private MoveAttribute attribute;

    @OneToMany(
            mappedBy = "moveVariant",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MoveEffect> effects = new ArrayList<>();

    private Boolean hasSpecialEffect;

}