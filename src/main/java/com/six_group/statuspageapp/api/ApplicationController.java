package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.api.dto.ApplicationDto;
import com.six_group.statuspageapp.domain.ApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/applications")
    public List<ApplicationDto> getAllApplications() {
        return null;
    }

    @GetMapping("/applications/{id}")
    public ApplicationDto getApplicationById(@PathVariable String id) {
        return null;
    }
}
