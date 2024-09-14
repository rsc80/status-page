package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.StatusPageAppApplication;
import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;
import com.six_group.statuspageapp.domain.ParticipantService;
import com.six_group.statuspageapp.domain.participant.DayData;
import com.six_group.statuspageapp.domain.participant.HourlyMetrics;
import com.six_group.statuspageapp.domain.participant.DayData;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.util.List;
import java.util.Locale;

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

  @GetMapping("/participants/{id}/{day}")
  public DayData getParticipantById(@PathVariable String id, @PathVariable String day) throws IOException {
    return this.participantService.getParticipantByIdAndHour(id, day);
  }

  @PostMapping("/participants/{id}/{serviceName}/{serviceVersion}")
  public void postParticipantById(@PathVariable String id, @PathVariable String serviceName, @PathVariable String serviceVersion, HourlyMetrics  hourlyMetrics) {
    var participant = StatusPageAppApplication.PARTICIPANT_MAP.get(id);
    var date = LocalDate.now().toString();
    var hour = "%02d".formatted(LocalDateTime.now().getHour()) + ":00";
    participant.getDailyData().stream().filter(v -> v.getDate().equals(date))
            .map(DayData::getServices)
            .flatMap(List::stream)
            .filter(v -> v.getServiceName().equalsIgnoreCase(serviceName) && v.getServiceVersion().equalsIgnoreCase(serviceVersion))
            .findFirst()
            .ifPresent(v -> v.getHours().put(hour, hourlyMetrics));
  }
}
