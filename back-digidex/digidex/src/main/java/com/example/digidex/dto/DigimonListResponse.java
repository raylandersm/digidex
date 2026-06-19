package com.example.digidex.dto;
import com.example.digidex.enums.DigimonAttribute;
import com.example.digidex.enums.DigimonType;
import com.example.digidex.enums.Level;

import java.util.UUID;

public record DigimonListResponse(
        UUID id,
        String name,
        String description,
        Level level,
        DigimonAttribute digimonAttribute,
        DigimonType type,
        String imageUrl
) {
}
