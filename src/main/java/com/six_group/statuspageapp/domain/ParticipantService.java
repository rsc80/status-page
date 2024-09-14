package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.StatusIndicator;
import com.six_group.statuspageapp.domain.participant.*;
import com.six_group.statuspageapp.persistence.ParticipantRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    private static final double SUCCESS_THRESHOLD = 0.05;
    private static final double WARNING_THRESHOLD = 0.10;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public List<ParticipantDto> getAllParticipants() {
        var participants = participantRepository.findAll();

        return participants.parallelStream()
                .map(this::aggregateDailyMetricsForParticipant)
                .map(participant -> participant.toDto(participant))
                .toList();
    }

    public ParticipantDto getParticipantById(String id) {
        return this.participantRepository.findById(id)
                .map(this::aggregateDailyMetricsForParticipant)
                .map(a -> a.toDto(a)).orElseThrow(RuntimeException::new);
    }

    private Participant aggregateDailyMetricsForParticipant(Participant participant) {
        var aggregatedDailyData = participant.getDailyData().stream()
                .map(this::aggregateDailyMetrics)
                .toList();

        participant.setDailyData(aggregatedDailyData);

        return participant;
    }

    private DayData aggregateDailyMetrics(DayData dayData) {
        int totalRequests;
        int totalSuccessCount;
        int totalClientErrorCount;
        int totalServerErrorCount;

        for (Service service : dayData.getServices()) {
            totalRequests = 0;
            totalSuccessCount = 0;
            totalClientErrorCount = 0;
            totalServerErrorCount = 0;
            for (HourlyMetrics hourlyMetrics : service.getHours().values()){
            totalSuccessCount += hourlyMetrics.getSuccessCount();
            totalClientErrorCount += hourlyMetrics.getClientErrorCount();
            totalServerErrorCount += hourlyMetrics.getServerErrorCount();
            totalRequests = totalSuccessCount + totalClientErrorCount + totalServerErrorCount;
            }
            buildDailyMetrics(service, totalRequests, totalSuccessCount, totalClientErrorCount, totalServerErrorCount);
            calculateStatusIndicator(dayData, totalServerErrorCount, totalRequests);
        }
        return dayData;
    }

    private static void buildDailyMetrics(Service service, int totalRequests, int totalSuccessCount, int totalClientErrorCount, int totalServerErrorCount) {
        DailyMetrics dailyMetrics = new DailyMetrics();
        dailyMetrics.setTotalRequests(totalRequests);
        dailyMetrics.setTotalSuccessCount(totalSuccessCount);
        dailyMetrics.setTotalClientErrorCount(totalClientErrorCount);
        dailyMetrics.setTotalServerErrorCount(totalServerErrorCount);
        service.setDailyMetrics(dailyMetrics);
    }

    private static void calculateStatusIndicator(DayData dayData, double totalServerErrorCount, int totalRequests) {
        double serverErrorPercentage = totalServerErrorCount / totalRequests;

        if (serverErrorPercentage <= SUCCESS_THRESHOLD) {
            dayData.setStatusIndicator(StatusIndicator.SUCCESS);
        } else if (serverErrorPercentage <= WARNING_THRESHOLD) {
            dayData.setStatusIndicator(StatusIndicator.WARNING);
        } else {
            dayData.setStatusIndicator(StatusIndicator.DANGER);
        }
    }

}
