package com.krishiai.platform.repository;

import com.krishiai.platform.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, UUID> {
    Optional<Farmer> findByPhoneNumber(String phoneNumber);
}
