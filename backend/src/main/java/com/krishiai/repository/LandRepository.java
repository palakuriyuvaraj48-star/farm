package com.krishiai.repository;

import com.krishiai.model.Land;
import com.krishiai.model.enums.Season;
import com.krishiai.model.enums.SoilType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Land entity
 * 
 * Provides data access operations for Land model.
 * Handles database queries and persistence operations for farm lands.
 */
@Repository
public interface LandRepository extends JpaRepository<Land, Long> {

    /**
     * Find all lands owned by a farmer
     * 
     * @param farmerId the farmer ID to search for
     * @return list of lands owned by the farmer
     */
    List<Land> findByFarmerId(Long farmerId);

    /**
     * Find a land by farmer ID and season
     * 
     * @param farmerId the farmer ID
     * @param season the agricultural season
     * @return Optional containing the Land if found
     */
    Optional<Land> findByFarmerIdAndSeason(Long farmerId, Season season);

    /**
     * Find all lands with a specific soil type
     * 
     * @param soilType the soil type to search for
     * @return list of lands with the specified soil type
     */
    List<Land> findByFarmerIdAndSoilType(Long farmerId, SoilType soilType);

    /**
     * Find all lands by soil type across all farmers
     * 
     * @param soilType the soil type to search for
     * @return list of lands with the specified soil type
     */
    @Query("SELECT l FROM Land l WHERE l.soilType = :soilType ORDER BY l.landId DESC")
    List<Land> findBySoilType(@Param("soilType") SoilType soilType);

    /**
     * Find all lands by season
     * 
     * @param season the agricultural season
     * @return list of lands in the specified season
     */
    List<Land> findBySeason(Season season);

    /**
     * Find all lands with area greater than a specified value
     * 
     * @param minArea minimum area in hectares
     * @return list of lands with area >= minArea
     */
    @Query("SELECT l FROM Land l WHERE l.areaHectares >= :minArea ORDER BY l.areaHectares DESC")
    List<Land> findByMinArea(@Param("minArea") BigDecimal minArea);

    /**
     * Find all lands for a farmer in a specific season
     * 
     * @param farmerId the farmer ID
     * @param season the agricultural season
     * @return list of lands owned by the farmer in the specified season
     */
    @Query("SELECT l FROM Land l WHERE l.farmer.farmerId = :farmerId AND l.season = :season")
    List<Land> findByFarmerAndSeason(
        @Param("farmerId") Long farmerId,
        @Param("season") Season season
    );

    /**
     * Get total area owned by a farmer
     * 
     * @param farmerId the farmer ID
     * @return total area in hectares
     */
    @Query("SELECT COALESCE(SUM(l.areaHectares), 0) FROM Land l WHERE l.farmer.farmerId = :farmerId")
    BigDecimal getTotalAreaByFarmerId(@Param("farmerId") Long farmerId);

    /**
     * Check if a farmer already has land registered for a specific season
     * 
     * @param farmerId the farmer ID
     * @param season the agricultural season
     * @return true if land exists for the farmer in the specified season
     */
    boolean existsByFarmerIdAndSeason(Long farmerId, Season season);
}
