package com.krishiai.dto;

import com.krishiai.model.enums.IrrigationType;
import com.krishiai.model.enums.Season;
import com.krishiai.model.enums.SoilType;
import com.krishiai.model.enums.WaterSource;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class LandDTO {
    private Long landId;
    private BigDecimal areaHectares;
    private SoilType soilType;
    private BigDecimal soilPh;
    private BigDecimal nitrogen;
    private BigDecimal phosphorus;
    private BigDecimal potassium;
    private WaterSource waterSource;
    private IrrigationType irrigationType;
    private Season season;
}
