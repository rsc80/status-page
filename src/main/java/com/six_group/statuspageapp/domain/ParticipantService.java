package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.StatusPageAppApplication;
import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;
import com.six_group.statuspageapp.api.dto.StatusIndicator;
import com.six_group.statuspageapp.domain.participant.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ParticipantService {


  private static final double SUCCESS_THRESHOLD = 0.05;
  private static final double WARNING_THRESHOLD = 0.80;

  private static DailyMetrics buildDailyMetrics(int totalRequests, int totalSuccessCount, int totalClientErrorCount, int totalServerErrorCount) {
    DailyMetrics dailyMetrics = new DailyMetrics();
    dailyMetrics.setTotalRequests(totalRequests);
    dailyMetrics.setTotalSuccessCount(totalSuccessCount);
    dailyMetrics.setTotalClientErrorCount(totalClientErrorCount);
    dailyMetrics.setTotalServerErrorCount(totalServerErrorCount);
    return dailyMetrics;
  }

  private static StatusIndicator calculateStatusIndicator(double totalServerErrorCount, int totalRequests) {
    double serverErrorPercentage = totalServerErrorCount / totalRequests;

    if (serverErrorPercentage <= SUCCESS_THRESHOLD) {
      return StatusIndicator.SUCCESS;
    } else if (serverErrorPercentage <= WARNING_THRESHOLD) {
      return StatusIndicator.WARNING;
    } else {
      return StatusIndicator.DANGER;
    }
  }

  public List<ParticipantOverviewDto> getParticipantOverview() throws IOException {

    List<Participant> participants = StatusPageAppApplication.PARTICIPANT_MAP.values().stream().toList();

    return participants.parallelStream()
        .map(this::aggregateDailyMetricsForParticipant)
        .map(participant -> participant.toOverviewDto(participant))
        .toList();
  }

  public List<ParticipantDto> getAllParticipants() {

    List<Participant> participants = StatusPageAppApplication.PARTICIPANT_MAP.values().stream().toList();

    return participants.parallelStream()
        .map(this::aggregateDailyMetricsForParticipant)
        .map(participant -> participant.toDto(participant))
        .toList();
  }

  public ParticipantDailyOverviewDto getParticipantByIdAndDay(String id, String day) {
    List<Participant> participants = StatusPageAppApplication.PARTICIPANT_MAP.values().stream().toList();

    Participant participant = participants.stream()
        .filter(p -> id.equals(p.getId()))
        .findFirst().orElseThrow(RuntimeException::new);
    DayData data = this.aggregateDailyMetricsForParticipant(participant).getDailyData().stream().filter(dayData -> dayData.getDate().equals(day)).findFirst().orElse(null);
    return new ParticipantDailyOverviewDto(participant.getName(), data);

  }

  private Participant aggregateDailyMetricsForParticipant(Participant participant) {
    var aggregatedDailyData = participant.getDailyData().stream()
        .map(this::aggregateDailyMetrics)
        .collect(Collectors.toList());

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
      StatusIndicator worstStatusIndicator = StatusIndicator.SUCCESS;
      for (HourlyMetrics hourlyMetrics : service.getHours().values()) {
        totalSuccessCount += hourlyMetrics.getSuccessCount();
        totalClientErrorCount += hourlyMetrics.getClientErrorCount();
        totalServerErrorCount += hourlyMetrics.getServerErrorCount();
        totalRequests = totalSuccessCount + totalClientErrorCount + totalServerErrorCount;
        worstStatusIndicator = worstStatusIndicator.getWorse(calculateStatusIndicator(hourlyMetrics.getServerErrorCount(), hourlyMetrics.getSuccessCount() + hourlyMetrics.getClientErrorCount() + hourlyMetrics.getServerErrorCount()));
      }
      service.setDailyMetrics(buildDailyMetrics(totalRequests, totalSuccessCount, totalClientErrorCount, totalServerErrorCount));
      dayData.setStatusIndicator(worstStatusIndicator);
    }
    return dayData;
  }

}
