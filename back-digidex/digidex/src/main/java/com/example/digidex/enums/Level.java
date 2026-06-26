package com.example.digidex.enums;

public enum Level {

    BABY_I(1),
    BABY_II(2),
    ROOKIE(3),
    CHAMPION(4),
    ULTIMATE(5),
    MEGA(6),
    MEGA_PLUS(7);

    private final int order;

    Level(int order) {
        this.order = order;
    }

    public int getOrder() {
        return order;
    }
}
