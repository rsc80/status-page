package com.six_group.statuspageapp.domain;

import com.six_group.statuspageapp.domain.participant.DayData;

public class ParticipantDailyOverviewDto {

    private DayData dayData;

    private String name;

    public ParticipantDailyOverviewDto(String name, DayData dayData) {
        this.dayData = dayData;
        this.name = name;
    }

    public DayData getDayData() {
        return dayData;
    }

    public void setDayData(DayData dayData) {
        this.dayData = dayData;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
