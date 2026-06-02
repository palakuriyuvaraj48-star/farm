package com.krishiai.model.enums;

/**
 * Season Enum - Represents agricultural seasons in India
 */
public enum Season {
    /**
     * Kharif season - monsoon season (June to October)
     */
    KHARIF("Kharif", "Monsoon season (June-October)"),
    
    /**
     * Rabi season - winter season (October to March)
     */
    RABI("Rabi", "Winter season (October-March)"),
    
    /**
     * Summer season (March to June)
     */
    SUMMER("Summer", "Summer season (March-June)"),
    
    /**
     * Zaid season - short duration summer season (March to June)
     */
    ZAID("Zaid", "Short duration season (March-June)");

    private final String displayName;
    private final String description;

    Season(String displayName, String description) {
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
