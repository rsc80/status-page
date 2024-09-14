package com.six_group.statuspageapp.domain.participant;


public class DailyMetrics {

    private int totalRequests;

    private int totalSuccessCount;

    private int totalClientErrorCount;

    private int totalServerErrorCount;


    public int getTotalRequests() {
        return totalRequests;
    }

    public DailyMetrics setTotalRequests(int totalRequests) {
        this.totalRequests = totalRequests;
        return this;
    }

    public int getTotalSuccessCount() {
        return totalSuccessCount;
    }

    public DailyMetrics setTotalSuccessCount(int totalSuccessCount) {
        this.totalSuccessCount = totalSuccessCount;
        return this;
    }

    public int getTotalClientErrorCount() {
        return totalClientErrorCount;
    }

    public DailyMetrics setTotalClientErrorCount(int totalClientErrorCount) {
        this.totalClientErrorCount = totalClientErrorCount;
        return this;
    }

    public int getTotalServerErrorCount() {
        return totalServerErrorCount;
    }

    public DailyMetrics setTotalServerErrorCount(int totalServerErrorCount) {
        this.totalServerErrorCount = totalServerErrorCount;
        return this;
    }
}
