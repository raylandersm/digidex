package com.example.digidex.dto;

import com.example.digidex.enums.DigimonAttribute;
import com.example.digidex.enums.DigimonType;
import com.example.digidex.enums.Level;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public record CreateDigimonRequest(
        String name,
        String description,
        Level level,
        DigimonAttribute digimonAttribute,
        DigimonType type,
        String evolutionCondition,
        List<UUID> previousEvolutionIds,
        List<CreateDigimonMoveRequest> moves,
        DigimonStatsRequest stats,
        DigimonStatsRequest maxStats,
        MultipartFile image
) {
}