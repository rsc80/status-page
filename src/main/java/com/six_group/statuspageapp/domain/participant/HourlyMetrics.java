package com.six_group.statuspageapp.domain.participant;



public class HourlyMetrics {

    private int successCount;

    private int clientErrorCount;

    private int serverErrorCount;

    public int getSuccessCount() {
        return successCount;
    }

    public int getClientErrorCount() {
        return clientErrorCount;
    }

    public int getServerErrorCount() {
        return serverErrorCount;
    }
}
