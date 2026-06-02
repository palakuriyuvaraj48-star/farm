package com.krishiai.model;

import com.krishiai.model.enums.IrrigationType;
import com.krishiai.model.enums.Season;
import com.krishiai.model.enums.SoilType;
import com.krishiai.model.enums.WaterSource;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Land Entity - Represents agricultural land/plot managed by a farmer
 * 
 * Maintains many-to-one relationship with Farmer entity.
 * Tracks soil properties, water sources, irrigation type, and seasonal information.
 * Composite unique constraint on farmerId and season to prevent duplicate land entries per season.
 */
@Entity
@Table(name = "land", uniqueConstraints = {
    @UniqueConstraint(name = "uk_land_farmer_season", columnNames = {"farmer_id", "season"})
}, indexes = {
    @Index(name = "idx_land_farmer_id", columnList = "farmer_id"),
    @Index(name = "idx_land_soil_type", columnList = "soil_type")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Land {
    
    /**
     * Primary key - land identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "land_id")
    private Long landId;

    /**
     * Many-to-one relationship with Farmer
     */
    @NotNull(message = "Farmer ID is required")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "farmer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_land_farmer"))
    private Farmer farmer;

    /**
     * Area of land in hectares
     */
    @DecimalMin(value = "0.1", message = "Land area must be at least 0.1 hectares")
    @Column(name = "area_hectares", precision = 10, scale = 2)
    private BigDecimal areaHectares;

    /**
     * Type of soil on the land
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "soil_type", length = 50)
    private SoilType soilType;

    /**
     * Soil pH level - typically between 0 and 14
     */
    @Column(name = "soil_ph", precision = 4, scale = 2)
    private BigDecimal soilPh;

    /**
     * Nitrogen content in soil (kg/hectare)
     */
    @Column(name = "nitrogen", precision = 10, scale = 2)
    private BigDecimal nitrogen;

    /**
     * Phosphorus content in soil (kg/hectare)
     */
    @Column(name = "phosphorus", precision = 10, scale = 2)
    private BigDecimal phosphorus;

    /**
     * Potassium content in soil (kg/hectare)
     */
    @Column(name = "potassium", precision = 10, scale = 2)
    private BigDecimal potassium;

    /**
     * Primary water source for irrigation
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "water_source", length = 50)
    private WaterSource waterSource;

    /**
     * Type of irrigation system used
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "irrigation_type", length = 50)
    private IrrigationType irrigationType;

    /**
     * Agricultural season for this land
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "season", length = 50)
    private Season season;

    /**
     * Timestamp when land record was created
     */
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp when land record was last updated
     */
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
