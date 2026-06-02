package com.krishiai.model.enums;

/**
 * SoilType Enum - Represents different types of soil
 */
public enum SoilType {
    /**
     * Laterite soil - red colored, acidic, found in tropical regions
     */
    LATERITE("Laterite", "Red colored, acidic soil"),
    
    /**
     * Alluvial soil - fertile, deposited by rivers
     */
    ALLUVIAL("Alluvial", "Fertile, river-deposited soil"),
    
    /**
     * Black soil - high moisture retention, rich in nutrients
     */
    BLACK("Black", "High moisture retention, nutrient-rich"),
    
    /**
     * Sandy soil - low fertility, quick drainage
     */
    SANDY("Sandy", "Low fertility, quick drainage"),
    
    /**
     * Clay soil - high water retention, compact
     */
    CLAY("Clay", "High water retention, compact"),
    
    /**
     * Loamy soil - ideal mixture of sand, silt, and clay
     */
    LOAMY("Loamy", "Ideal mixture of sand, silt, and clay"),
    
    /**
     * Red soil - acidic, found in southern India
     */
    RED("Red", "Acidic soil found in southern India"),
    
    /**
     * Desert soil - low fertility, sandy
     */
    DESERT("Desert", "Low fertility, sandy soil");

    private final String displayName;
    private final String description;

    SoilType(String displayName, String description) {
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
