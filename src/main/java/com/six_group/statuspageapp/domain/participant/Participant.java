package com.six_group.statuspageapp.domain.participant;

import com.six_group.statuspageapp.api.dto.ParticipantDto;
import com.six_group.statuspageapp.api.dto.ParticipantOverviewDto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Participant {
  private String id;

  private String name;

  private Boolean isExternal;

  private List<DayData> dailyData = new ArrayList<>();

  public Participant() {
  }

  public String getId() {
    return id;
  }

  public Participant setId(String id) {
    this.id = id;
    return this;
  }

  public String getName() {
    return name;
  }

  public Participant setName(String name) {
    this.name = name;
    return this;
  }

  public Boolean getIsExternal() {
    return isExternal;
  }

  public void setExternal(Boolean external) {
    isExternal = external;
  }

  public List<DayData> getDailyData() {
    return dailyData;
  }

  public void setDailyData(List<DayData> dailyData) {
    this.dailyData = dailyData;
  }

  public ParticipantDto toDto(Participant participant) {
    return new ParticipantDto(
        participant.getId(),
        participant.getName(),
        participant.getDailyData()
    );
  }

  public ParticipantOverviewDto toOverviewDto(Participant participant) {
    List<DayDataOverview> dayDataOverviewDtos = participant.getDailyData().stream()
        .map(dayData -> new DayDataOverview(dayData.getDate(),
            dayData.getStatusIndicator(),
            dayData.getServices()
                .stream().map(service ->
                    new ServiceOverview(service.getServiceName(), service.getServiceVersion(), service.getDailyMetrics())).toList()
        )).collect(Collectors.toList());
    return new ParticipantOverviewDto(
        participant.getId(),
        participant.getName(),
        participant.getIsExternal(),
        dayDataOverviewDtos);
  }
}
