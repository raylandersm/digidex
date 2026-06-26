package com.example.digidex.dto;

import java.util.List;
import java.util.UUID;

public record MoveVariantResponse(

        UUID id,

        String attribute,

        List<MoveEffectResponse> effects

) {
}