package com.six_group.statuspageapp.domain.participant;

import com.redis.om.spring.annotations.Document;

@Document
public class ServiceOverview {

    private String serviceName;

    private String serviceVersion;

    private DailyMetrics dailyMetrics;

    public ServiceOverview() {
    }

    public ServiceOverview(String serviceName, String serviceVersion, DailyMetrics dailyMetrics) {
        this.serviceName = serviceName;
        this.serviceVersion = serviceVersion;
        this.dailyMetrics = dailyMetrics;
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

}
