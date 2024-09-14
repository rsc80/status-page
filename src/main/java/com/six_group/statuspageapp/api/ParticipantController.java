package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;
import com.six_group.statuspageapp.domain.ParticipantService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ParticipantController {

    private final ParticipantService participantService;

    public ParticipantController(ParticipantService participantService) {
        this.participantService = participantService;
    }

    @GetMapping("/participants")
    public List<ParticipantDto> getAllParticipants() {
        return this.participantService.getAllParticipants();
    }

    @GetMapping("/participants-overview")
    public List<ParticipantOverviewDto> getParticipantsOverview() {
        return this.participantService.getParticipantOverview();
    }

    @GetMapping("/participants/{id}")
    public ParticipantDto getParticipantById(@PathVariable String id) {
        return this.participantService.getParticipantById(id);
    }
}
