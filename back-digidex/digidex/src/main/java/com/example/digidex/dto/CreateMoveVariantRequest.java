package com.example.digidex.dto;

import com.example.digidex.enums.MoveAttribute;

import java.util.List;

public record CreateMoveVariantRequest(

        MoveAttribute attribute,

        List<CreateMoveEffectRequest> effects

) {
}
