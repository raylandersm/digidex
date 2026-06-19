package com.example.digidex.dto;

import java.util.UUID;

public record EvolutionResponse(

        UUID id,

        String name,

        String imageUrl,

        String evolutionCondition

) {
}
