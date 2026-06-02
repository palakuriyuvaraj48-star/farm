package com.krishiai.repository;

import com.krishiai.model.Crop;
import com.krishiai.model.enums.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Crop entity
 * 
 * Provides data access operations for Crop master data.
 * Handles database queries for crop information and recommendations.
 */
@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {

    /**
     * Find all crops for a specific season
     * 
     * @param season the agricultural season
     * @return list of crops available in the specified season
     */
    List<Crop> findBySeason(Season season);

    /**
     * Find crops by name (case-insensitive, partial match)
     * 
     * @param cropName the crop name to search for
     * @return list of crops matching the search term
     */
    List<Crop> findByCropNameContainingIgnoreCase(String cropName);

    /**
     * Find all crops ordered by name alphabetically
     * 
     * @return list of all crops ordered by crop name
     */
    List<Crop> findAllByOrderByCropNameAsc();

    /**
     * Find a crop by exact name match (case-insensitive)
     * 
     * @param cropName the exact crop name
     * @return Optional containing the Crop if found
     */
    Optional<Crop> findByCropNameIgnoreCase(String cropName);

    /**
     * Find all crops for a specific season ordered by profit estimate (descending)
     * 
     * @param season the agricultural season
     * @return list of crops ordered by profit estimate
     */
    @Query("SELECT c FROM Crop c WHERE c.season = :season ORDER BY c.profitEstimate DESC NULLS LAST")
    List<Crop> findBySeasonOrderByProfitDesc(@Param("season") Season season);

    /**
     * Find all crops that require water within a certain range
     * 
     * @param minWater minimum water requirement in mm
     * @param maxWater maximum water requirement in mm
     * @return list of crops with water requirements within the range
     */
    @Query("SELECT c FROM Crop c WHERE c.waterRequiredMm BETWEEN :minWater AND :maxWater ORDER BY c.cropName ASC")
    List<Crop> findByWaterRequirement(
        @Param("minWater") java.math.BigDecimal minWater,
        @Param("maxWater") java.math.BigDecimal maxWater
    );

    /**
     * Find all crops for a specific season ordered by cultivation days (ascending)
     * 
     * @param season the agricultural season
     * @return list of crops ordered by cultivation days
     */
    @Query("SELECT c FROM Crop c WHERE c.season = :season ORDER BY c.cultivationDays ASC NULLS LAST")
    List<Crop> findBySeasonOrderByCultivationDays(@Param("season") Season season);

    /**
     * Find crops by cultivation days range
     * 
     * @param minDays minimum cultivation days
     * @param maxDays maximum cultivation days
     * @return list of crops with cultivation duration within the range
     */
    @Query("SELECT c FROM Crop c WHERE c.cultivationDays BETWEEN :minDays AND :maxDays ORDER BY c.cultivationDays ASC")
    List<Crop> findByCultivationDaysRange(
        @Param("minDays") Integer minDays,
        @Param("maxDays") Integer maxDays
    );

    /**
     * Search crops by name and season
     * 
     * @param cropName the crop name to search for
     * @param season the agricultural season
     * @return list of crops matching both criteria
     */
    @Query("SELECT c FROM Crop c WHERE LOWER(c.cropName) LIKE LOWER(CONCAT('%', :cropName, '%')) AND c.season = :season")
    List<Crop> searchByCropNameAndSeason(
        @Param("cropName") String cropName,
        @Param("season") Season season
    );

    /**
     * Get count of crops by season
     * 
     * @param season the agricultural season
     * @return number of crops in the specified season
     */
    long countBySeason(Season season);
}
