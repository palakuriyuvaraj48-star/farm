package com.krishiai.model.enums;

/**
 * IrrigationType Enum - Represents different types of irrigation methods
 */
public enum IrrigationType {
    /**
     * Flood/Basin irrigation - flooding the entire field
     */
    FLOOD("Flood/Basin", "Flood the entire field"),
    
    /**
     * Drip irrigation - water delivered directly to plant roots
     */
    DRIP("Drip", "Water delivered to plant roots"),
    
    /**
     * Sprinkler irrigation - water sprayed like rain
     */
    SPRINKLER("Sprinkler", "Water sprayed like rain"),
    
    /**
     * Furrow irrigation - water in channels between rows
     */
    FURROW("Furrow", "Water in channels between rows"),
    
    /**
     * Flood/Check basin
     */
    CHECK_BASIN("Check Basin", "Check basin irrigation"),
    
    /**
     * Rainwater dependent
     */
    RAINFED("Rainfed", "Dependent on rainfall"),
    
    /**
     * Sprinkler or Micro irrigation
     */
    MICRO("Micro", "Micro irrigation system"),
    
    /**
     * Others
     */
    OTHER("Other", "Other irrigation method");

    private final String displayName;
    private final String description;

    IrrigationType(String displayName, String description) {
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
