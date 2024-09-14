package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;
import com.six_group.statuspageapp.domain.ParticipantService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class ParticipantController {

  private final ParticipantService participantService;

  public ParticipantController(ParticipantService participantService) {
    this.participantService = participantService;
  }

  @GetMapping("/participants")
  public List<ParticipantDto> getAllParticipants() throws IOException {
    return this.participantService.getAllParticipants();
  }

  @GetMapping("/participants-overview")
  public List<ParticipantOverviewDto> getParticipantsOverview() throws IOException {
    return this.participantService.getParticipantOverview();
  }

  @GetMapping("/participants/{id}")
  public ParticipantDto getParticipantById(@PathVariable String id) {
    return this.participantService.getParticipantById(id);
  }
}
