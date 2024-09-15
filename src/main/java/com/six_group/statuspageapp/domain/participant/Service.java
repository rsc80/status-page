package com.six_group.statuspageapp.domain.participant;

import java.util.Map;

public class Service {

    private String serviceName;

    private String serviceVersion;

    private double avgLatency;

    private DailyMetrics dailyMetrics;

    private Map<String, HourlyMetrics> hours;

    public Service() {
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceVersion() {
        return serviceVersion;
    }

    public void setServiceVersion(String serviceVersion) {
        this.serviceVersion = serviceVersion;
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

    public void setHours(Map<String, HourlyMetrics> hours) {
        this.hours = hours;
    }

    public double getAvgLatency() {
        return avgLatency;
    }

    public void setAvgLatency(double avgLatency) {
        this.avgLatency = avgLatency;
    }
}
