package com.krishiai.dto;

import java.math.BigDecimal;
import java.util.List;

public record EcosystemSnapshotResponse(
        List<MarketCard> market,
        List<SchemeCard> schemes,
        List<CommunityCard> community,
        List<MarketplaceCard> marketplace,
        List<WarehouseCard> warehouses,
        List<LaborCard> labor,
        FinanceCard finance
) {
    public record MarketCard(String crop, BigDecimal currentPrice, BigDecimal predictedPrice, String recommendation, BigDecimal confidenceScore) {}
    public record SchemeCard(String name, BigDecimal eligibilityScore, String benefit, String action) {}
    public record CommunityCard(String title, String category, int replies, boolean urgent) {}
    public record MarketplaceCard(String product, String category, BigDecimal price, String seller) {}
    public record WarehouseCard(String name, String district, BigDecimal availableCapacityQuintals, BigDecimal monthlyRate) {}
    public record LaborCard(String role, String location, BigDecimal wagePerDay, int workersNeeded) {}
    public record FinanceCard(BigDecimal suggestedLoan, BigDecimal monthlyEmi, String riskLevel, String note) {}
}
