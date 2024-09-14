package com.six_group.statuspageapp.domain.participant;

import com.six_group.statuspageapp.api.dto.StatusIndicator;

import java.util.ArrayList;
import java.util.List;

public class DayData {

    private String date;

    private StatusIndicator statusIndicator;

    private List<Service> services = new ArrayList<Service>();

    public DayData() {

    }

    public DayData(String date, StatusIndicator statusIndicator, List<Service> services) {
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

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }
}
