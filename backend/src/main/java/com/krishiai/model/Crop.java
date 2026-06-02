package com.krishiai.model;

import com.krishiai.model.enums.Season;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Crop Entity - Represents crop master data
 * 
 * Master data entity managed by administrators. Contains standardized information
 * about various crops including cultivation requirements, seasonal information,
 * and profit estimates. This is not user-input data but reference data for the system.
 */
@Entity
@Table(name = "crop", indexes = {
    @Index(name = "idx_crop_name", columnList = "crop_name"),
    @Index(name = "idx_crop_season", columnList = "season"),
    @Index(name = "idx_crop_name_season", columnList = "crop_name, season")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crop {
    
    /**
     * Primary key - crop identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_id")
    private Long cropId;

    /**
     * Name of the crop
     */
    @Column(name = "crop_name", nullable = false, length = 255)
    private String cropName;

    /**
     * Description of the crop and its characteristics
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * Number of days required for cultivation from sowing to harvest
     */
    @Column(name = "cultivation_days")
    private Integer cultivationDays;

    /**
     * Water required for the crop (in millimeters)
     */
    @Column(name = "water_required_mm", precision = 10, scale = 2)
    private BigDecimal waterRequiredMm;

    /**
     * Minimum soil pH level required for optimal growth
     */
    @Column(name = "soil_ph_min", precision = 4, scale = 2)
    private BigDecimal soilPhMin;

    /**
     * Maximum soil pH level for optimal growth
     */
    @Column(name = "soil_ph_max", precision = 4, scale = 2)
    private BigDecimal soilPhMax;

    /**
     * Nitrogen requirement for the crop (kg/hectare)
     */
    @Column(name = "nitrogen_req_kg", precision = 10, scale = 2)
    private BigDecimal nitrogenReqKg;

    /**
     * Agricultural season(s) for this crop
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "season", length = 50)
    private Season season;

    /**
     * Estimated profit per hectare (in currency units)
     */
    @Column(name = "profit_estimate", precision = 15, scale = 2)
    private BigDecimal profitEstimate;

    /**
     * Timestamp when crop record was created
     */
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
