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
         return applicationRepository.findAll().stream().map(a -> a.toDto(a)).toList();
    }

    public ApplicationDto getApplicationById(String id) {
        return this.applicationRepository.findById(id).map(a -> a.toDto(a)).orElseThrow(RuntimeException::new);
    }


}
