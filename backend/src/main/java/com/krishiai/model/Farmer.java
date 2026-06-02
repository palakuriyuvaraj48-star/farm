package com.krishiai.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Farmer Entity - Represents farmer profile and farming information
 * 
 * Maintains one-to-one relationship with User entity for authentication
 * and one-to-many relationship with Land entity for farm management.
 */
@Entity
@Table(name = "farmer", indexes = {
    @Index(name = "idx_farmer_user_id", columnList = "user_id", unique = true),
    @Index(name = "idx_farmer_phone", columnList = "phone")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Farmer {
    
    /**
     * Primary key - farmer identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farmer_id")
    private Long farmerId;

    /**
     * Foreign key - one-to-one relationship with User for authentication
     */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", unique = true, nullable = false, foreignKey = @ForeignKey(name = "fk_farmer_user"))
    private User user;

    /**
     * Farmer's full name
     */
    @NotBlank(message = "Farmer name is required")
    @Column(nullable = false, length = 255)
    private String name;

    /**
     * Farmer's phone number
     */
    @Column(length = 20)
    private String phone;

    /**
     * Years of farming experience
     */
    @Min(value = 0, message = "Experience years must be >= 0")
    @Column(name = "experience_years")
    private Integer experienceYears;

    /**
     * Farmer's address
     */
    @Column(length = 500)
    private String address;

    /**
     * Farm location latitude for mapping and geolocation
     */
    @Column
    private Double latitude;

    /**
     * Farm location longitude for mapping and geolocation
     */
    @Column
    private Double longitude;

    /**
     * URL of farmer's profile picture
     */
    @Column(name = "profile_pic_url", length = 1000)
    private String profilePicUrl;

    /**
     * Flag indicating if farmer practices organic farming
     */
    @Column(name = "is_organic")
    @Builder.Default
    private Boolean isOrganic = false;

    /**
     * One-to-many relationship with Land entity
     * A farmer can own multiple lands
     */
    @OneToMany(mappedBy = "farmer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Land> lands = new HashSet<>();

    /**
     * Timestamp when farmer record was created
     */
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp when farmer record was last updated
     */
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Add a land to the farmer's lands
     * @param land the land to add
     */
    public void addLand(Land land) {
        lands.add(land);
        land.setFarmer(this);
    }

    /**
     * Remove a land from the farmer's lands
     * @param land the land to remove
     */
    public void removeLand(Land land) {
        lands.remove(land);
        land.setFarmer(null);
    }
}
