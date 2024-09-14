package com.six_group.statuspageapp.domain.participant;

import com.six_group.statuspageapp.api.dto.StatusIndicator;

import java.util.ArrayList;
import java.util.List;

public class DayData {

    private String date;

    private StatusIndicator statusIndicator;

    private List<Api> apis = new ArrayList<Api>();

    public DayData() {

    }


    public DayData(String date, StatusIndicator statusIndicator, List<Api> apis) {
        this.date = date;
        this.statusIndicator = statusIndicator;
        this.apis = apis;
    }

    public String getDate() {
        return date;
    }

    public DayData setDate(String date) {
        this.date = date;
        return this;
    }

    public StatusIndicator getStatusIndicator() {
        return statusIndicator;
    }

    public DayData setStatusIndicator(StatusIndicator statusIndicator) {
        this.statusIndicator = statusIndicator;
        return this;
    }

    public List<Api> getApis() {
        return apis;
    }

    public DayData setApis(List<Api> apis) {
        this.apis = apis;
        return this;
    }
}
