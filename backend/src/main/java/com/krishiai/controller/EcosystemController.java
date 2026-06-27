package com.krishiai.controller;

import com.krishiai.dto.ApiResponse;
import com.krishiai.dto.EcosystemSnapshotResponse;
import com.krishiai.service.AdvisoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ecosystem")
public class EcosystemController {

    private final AdvisoryService advisoryService;

    public EcosystemController(AdvisoryService advisoryService) {
        this.advisoryService = advisoryService;
    }

    @GetMapping("/snapshot")
    public ApiResponse<EcosystemSnapshotResponse> getSnapshot() {
        return ApiResponse.ok("Ecosystem snapshot ready", advisoryService.getEcosystemSnapshot());
    }
}
