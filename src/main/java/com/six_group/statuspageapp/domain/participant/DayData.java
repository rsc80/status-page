package com.six_group.statuspageapp.domain.participant;

import com.six_group.statuspageapp.api.dto.StatusIndicator;

import java.util.Map;

public class DayData {

    private String date;

    private StatusIndicator statusIndicator;


    private DailyMetrics dailyMetrics;

    private Map<String, HourlyMetrics> hours;

    public DayData() {
    }

    public DayData(String date, StatusIndicator statusIndicator, DailyMetrics dailyMetrics, Map<String, HourlyMetrics> hours) {
        this.date = date;
        this.statusIndicator = statusIndicator;
        this.dailyMetrics = dailyMetrics;
        this.hours = hours;
    }

    public String getDate() {
        return date;
    }

    public StatusIndicator getStatusIndicator() {
        return statusIndicator;
    }

    public DailyMetrics getDailyMetrics() {
        return dailyMetrics;
    }

    public Map<String, HourlyMetrics> getHours() {
        return hours;
    }

    public DayData setDate(String date) {
        this.date = date;
        return this;
    }

    public DayData setStatusIndicator(StatusIndicator statusIndicator) {
        this.statusIndicator = statusIndicator;
        return this;
    }

    public DayData setDailyMetrics(DailyMetrics dailyMetrics) {
        this.dailyMetrics = dailyMetrics;
        return this;
    }

    public DayData setHours(Map<String, HourlyMetrics> hours) {
        this.hours = hours;
        return this;
    }
}
