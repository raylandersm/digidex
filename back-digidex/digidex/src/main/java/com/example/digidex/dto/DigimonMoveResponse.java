package com.example.digidex.dto;

import java.util.UUID;

public record DigimonMoveResponse(

        UUID id,

        String name,

        String description,

        Integer accuracy,

        Integer power,

        Integer spCost,

        String attribute,

        String type,

        Integer level

) {
}