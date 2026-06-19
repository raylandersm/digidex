package com.example.digidex.dto;

public record DigimonStatsRequest(
        Integer hp,
        Integer sp,
        Integer atk,
        Integer def,
        Integer intel,
        Integer spi,
        Integer spd
) {
}
