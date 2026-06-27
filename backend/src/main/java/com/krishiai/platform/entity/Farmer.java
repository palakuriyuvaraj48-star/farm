package com.krishiai.platform.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "farmers")
@Data
public class Farmer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "phone_number", nullable = false, unique = true, length = 15)
    private String phoneNumber;

    @Column(name = "preferred_language", length = 10)
    private String preferredLanguage = "te-IN";

    @Column(length = 100)
    private String district;

    @Column(length = 100)
    private String mandal;

    @Column(length = 100)
    private String village;

    @Column(name = "total_land_acres")
    private BigDecimal totalLandAcres;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }
}
