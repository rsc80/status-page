package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.domain.participant.DailyMetrics;
import com.six_group.statuspageapp.domain.participant.DayData;
import com.six_group.statuspageapp.domain.participant.HourlyMetrics;
import com.six_group.statuspageapp.domain.participant.Participant;
import com.six_group.statuspageapp.persistence.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;

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
    private DayData aggregateDailyMetrics(DayData dayData){
        int totalRequests = 0;
        int totalSuccessCount = 0;
        int totalClientErrorCount = 0;
        int totalServerErrorCount = 0;

        for(HourlyMetrics hourlyData : dayData.getHours().values()){
            totalSuccessCount += hourlyData.getSuccessCount();
            totalClientErrorCount += hourlyData.getClientErrorCount();
            totalServerErrorCount += hourlyData.getServerErrorCount();
            totalRequests = totalClientErrorCount + totalServerErrorCount + totalSuccessCount;
        }

        DailyMetrics dailyMetrics = new DailyMetrics();
        dailyMetrics.setTotalRequests(totalRequests);
        dailyMetrics.setTotalSuccessCount(totalSuccessCount);
        dailyMetrics.setTotalClientErrorCount(totalClientErrorCount);
        dailyMetrics.setTotalServerErrorCount(totalServerErrorCount);
        dayData.setDailyMetrics(dailyMetrics);
        return dayData;
    }

}
