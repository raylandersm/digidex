package com.example.digidex.dto;

import java.util.List;
import java.util.UUID;

public record DigimonMoveResponse(

        UUID id,

        String name,

        String description,

        Integer accuracy,

        Integer power,

        Integer spCost,

        List<MoveVariantResponse> variants,

        String type


) {
}