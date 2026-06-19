package com.example.digidex.dto;

import com.example.digidex.enums.MoveAttribute;
import com.example.digidex.enums.MoveCategory;

import java.util.UUID;

public record CreateDigimonMoveRequest(

        UUID moveId,

        String moveName,
        String description,
        Integer accuracy,
        Integer power,
        Integer spCost,
        MoveAttribute attribute,
        MoveCategory type,
        Integer level
) {
}