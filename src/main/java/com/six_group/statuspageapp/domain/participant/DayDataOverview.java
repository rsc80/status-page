package com.six_group.statuspageapp.domain.participant;

import com.redis.om.spring.annotations.Document;
import com.six_group.statuspageapp.api.dto.StatusIndicator;

import java.util.ArrayList;
import java.util.List;


@Document
public class DayDataOverview {

    private String date;

    private StatusIndicator statusIndicator;

    private List<ServiceOverview> services = new ArrayList<>();

    public DayDataOverview() {

    }

    public DayDataOverview(String date, StatusIndicator statusIndicator, List<ServiceOverview> services) {
        this.date = date;
        this.statusIndicator = statusIndicator;
        this.services = services;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public StatusIndicator getStatusIndicator() {
        return statusIndicator;
    }

    public void setStatusIndicator(StatusIndicator statusIndicator) {
        this.statusIndicator = statusIndicator;
    }

    public List<ServiceOverview> getServices() {
        return services;
    }

    public void setServices(List<ServiceOverview> services) {
        this.services = services;
    }
}
