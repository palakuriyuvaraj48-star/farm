package com.krishiai.repository;

import com.krishiai.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Farmer entity
 * 
 * Provides data access operations for Farmer model.
 * Handles database queries and persistence operations.
 */
@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {

    /**
     * Find a farmer by their associated user ID
     * 
     * @param userId the user ID to search for
     * @return Optional containing the Farmer if found
     */
    Optional<Farmer> findByUserId(Long userId);

    /**
     * Find a farmer by their phone number
     * 
     * @param phone the phone number to search for
     * @return Optional containing the Farmer if found
     */
    Optional<Farmer> findByPhone(String phone);

    /**
     * Find all farmers created within a date range
     * 
     * @param startDate the start date (inclusive)
     * @param endDate the end date (inclusive)
     * @return list of farmers created between the specified dates
     */
    @Query("SELECT f FROM Farmer f WHERE f.createdAt BETWEEN :startDate AND :endDate ORDER BY f.createdAt DESC")
    List<Farmer> findAllByCreatedAtBetween(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );

    /**
     * Find all farmers who practice organic farming
     * 
     * @return list of organic farmers
     */
    List<Farmer> findByIsOrganicTrue();

    /**
     * Find all farmers by experience level
     * 
     * @param minExperience minimum experience years
     * @return list of farmers with experience >= minExperience
     */
    @Query("SELECT f FROM Farmer f WHERE f.experienceYears >= :minExperience ORDER BY f.experienceYears DESC")
    List<Farmer> findByMinExperience(@Param("minExperience") Integer minExperience);

    /**
     * Check if a farmer exists for a given user ID
     * 
     * @param userId the user ID to check
     * @return true if farmer exists for the user
     */
    boolean existsByUserId(Long userId);
}
