package com.example.digidex.dto;

import java.util.UUID;

public record MoveEffectResponse(

        UUID id,

        String effect,

        Integer chance,

        String vulnerableTo,

        Integer bonusDamagePercent,

        String removedBy

) {
}
