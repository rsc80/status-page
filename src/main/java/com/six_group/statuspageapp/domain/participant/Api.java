package com.six_group.statuspageapp.domain.participant;

import java.util.Map;

public class Api {

    private String apiName;

    private String apiVersion;

    private DailyMetrics dailyMetrics;

    private Map<String, HourlyMetrics> hours;

    public Api() {
    }

    public String getApiName() {
        return apiName;
    }

    public Api setApiName(String apiName) {
        this.apiName = apiName;
        return this;
    }

    public String getApiVersion() {
        return apiVersion;
    }

    public Api setApiVersion(String apiVersion) {
        this.apiVersion = apiVersion;
        return this;
    }

    public DailyMetrics getDailyMetrics() {
        return dailyMetrics;
    }

    public void setDailyMetrics(DailyMetrics dailyMetrics) {
        this.dailyMetrics = dailyMetrics;
    }

    public Map<String, HourlyMetrics> getHours() {
        return hours;
    }

    public Api setHours(Map<String, HourlyMetrics> hours) {
        this.hours = hours;
        return this;
    }
}
