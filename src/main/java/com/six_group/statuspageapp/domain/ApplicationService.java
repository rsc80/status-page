package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.api.dto.ApplicationDto;
import com.six_group.statuspageapp.persistence.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<ApplicationDto> getAllApplications() {
        var test = applicationRepository.findAll();
        return null;
    }

    public ApplicationDto getApplicationById(String id) {

        this.applicationRepository.findById(id).orElseThrow(RuntimeException::new);
        return null;
    }


}
