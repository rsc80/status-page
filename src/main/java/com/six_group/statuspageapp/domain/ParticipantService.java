package com.six_group.statuspageapp.domain;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;
import com.six_group.statuspageapp.api.dto.StatusIndicator;
import com.six_group.statuspageapp.domain.participant.*;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@org.springframework.stereotype.Service
public class ParticipantService {


    private static final double SUCCESS_THRESHOLD = 0.05;
    private static final double WARNING_THRESHOLD = 0.10;

    public List<ParticipantOverviewDto> getParticipantOverview() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("participant-test-data.json").getInputStream();
        List<Participant> participants = objectMapper.readValue(inputStream, new TypeReference<>() {});

        return participants.parallelStream()
                .map(this::aggregateDailyMetricsForParticipant)
                .map(participant -> participant.toOverviewDto(participant))
                .toList();
    }

    public List<ParticipantDto> getAllParticipants() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("participant-test-data.json").getInputStream();
        List<Participant> participants = objectMapper.readValue(inputStream, new TypeReference<>() {});

        return participants.parallelStream()
                .map(this::aggregateDailyMetricsForParticipant)
                .map(participant -> participant.toDto(participant))
                .toList();
    }

    public DayData getParticipantByIdAndHour(String id, String day) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("participant-test-data.json").getInputStream();
        List<Participant> participants = objectMapper.readValue(inputStream, new TypeReference<>() {});

        Participant participant = participants.stream()
                .filter(p -> id.equals(p.getId()))
                .findFirst().orElseThrow(RuntimeException::new);
        return this.aggregateDailyMetricsForParticipant(participant).getDailyData().stream().filter(dayData -> dayData.getDate().equals(day)).findFirst().orElseThrow(RuntimeException::new);


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
