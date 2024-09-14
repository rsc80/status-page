package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.StatusPageAppApplication;
import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;
import com.six_group.statuspageapp.domain.ParticipantDailyOverviewDto;
import com.six_group.statuspageapp.domain.ParticipantService;
import com.six_group.statuspageapp.domain.participant.DayData;
import com.six_group.statuspageapp.domain.participant.HourlyMetrics;
import com.six_group.statuspageapp.domain.participant.Service;
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

    @GetMapping("/participants/{id}/{day}")
    public ParticipantDailyOverviewDto getParticipantById(@PathVariable String id, @PathVariable String day) {
        return this.participantService.getParticipantByIdAndDay(id, day);
    }

    @PostMapping("/participants/{id}/{date}/{hour}/{serviceName}/{serviceVersion}")
    public void postParticipantById(@PathVariable String id, @PathVariable String date, @PathVariable String hour, @PathVariable String serviceName, @PathVariable String serviceVersion, @RequestBody HourlyMetrics hourlyMetrics) {
        var participant = StatusPageAppApplication.PARTICIPANT_MAP.get(id);
        if (participant != null) {

            var dailyData = participant.getDailyData().stream().filter(v -> v.getDate().equals(date)).findFirst().orElseGet(() -> {
                var dayData = new DayData();
                dayData.setDate(date);
                participant.getDailyData().add(dayData);
                return dayData;
            });

            var service = dailyData.getServices().stream()
                    .filter(v -> v.getServiceName().equalsIgnoreCase(serviceName) && v.getServiceVersion().equalsIgnoreCase(serviceVersion))
                    .findFirst()
                    .orElseGet(() -> {
                        var serviceData = new Service();
                        serviceData.setServiceName(serviceName);
                        serviceData.setServiceVersion(serviceVersion);
                        serviceData.setHours(new java.util.HashMap<>());
                        dailyData.getServices().add(serviceData);
                        return serviceData;
                    });

            service.getHours().put(hour, hourlyMetrics);
        }
    }
}
