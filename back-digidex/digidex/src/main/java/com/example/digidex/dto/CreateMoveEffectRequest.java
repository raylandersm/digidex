package com.example.digidex.dto;

import com.example.digidex.enums.MoveAttribute;

import java.util.UUID;

public record CreateMoveEffectRequest(

        UUID statusEffectId,

        Integer chance,

        MoveAttribute vulnerableTo,

        Integer bonusDamagePercent,

        MoveAttribute removedBy

) {
}