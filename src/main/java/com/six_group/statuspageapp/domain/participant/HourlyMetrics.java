package com.six_group.statuspageapp.domain.participant;


import com.redis.om.spring.annotations.Document;

@Document
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
