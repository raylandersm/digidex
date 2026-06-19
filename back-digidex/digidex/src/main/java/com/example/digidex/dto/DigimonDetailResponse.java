package com.example.digidex.dto;

import com.example.digidex.enums.DigimonAttribute;
import com.example.digidex.enums.DigimonType;
import com.example.digidex.enums.Level;

import java.util.List;
import java.util.UUID;

public record DigimonDetailResponse(

        UUID id,

        String name,

        String description,

        Level level,

        DigimonAttribute digimonAttribute,

        DigimonType type,

        String imageUrl,

        String evolutionCondition,

        DigimonStatsResponse stats,

        DigimonStatsResponse maxStats,

        List<DigimonMoveResponse> moves,

        List<EvolutionResponse> previousEvolutions,

        List<EvolutionResponse> nextEvolutions

) {
}
