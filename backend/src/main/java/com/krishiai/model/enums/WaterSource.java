package com.krishiai.model.enums;

/**
 * WaterSource Enum - Represents different water sources for irrigation
 */
public enum WaterSource {
    /**
     * Well water
     */
    WELL("Well", "Underground well"),
    
    /**
     * Borewell/Tube well
     */
    BOREWELL("Borewell", "Deep borewell/tube well"),
    
    /**
     * Rainwater
     */
    RAINWATER("Rainwater", "Monsoon rainwater"),
    
    /**
     * Canal water
     */
    CANAL("Canal", "Government canal"),
    
    /**
     * River water
     */
    RIVER("River", "River source"),
    
    /**
     * Tank/Pond water
     */
    TANK("Tank", "Agricultural tank or pond"),
    
    /**
     * Groundwater
     */
    GROUNDWATER("Groundwater", "Underground groundwater"),
    
    /**
     * Others
     */
    OTHER("Other", "Other water source");

    private final String displayName;
    private final String description;

    WaterSource(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}
