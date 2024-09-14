package com.six_group.statuspageapp.api.dto;

import com.six_group.statuspageapp.domain.participant.DayData;

import java.util.List;

public record ParticipantDto(
        String id,
        String name,
        List<DayData> dailyData
) {


}
