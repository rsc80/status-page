package com.six_group.statuspageapp.api.dto;

import com.six_group.statuspageapp.domain.participant.DayDataOverview;

import java.util.List;

public record ParticipantOverviewDto(
    String id,
    String name,
    Boolean isExternal,
    List<DayDataOverview> dailyData
) {


}
