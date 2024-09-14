package com.six_group.statuspageapp.api.dto;

public class StatusLine {

    private String status;

    private StatusIndicator statusIndicator;

    public StatusLine(String status, StatusIndicator statusIndicator) {
        this.status = status;
        this.statusIndicator = statusIndicator;
    }



    public StatusIndicator getStatusIndicator() {
        return statusIndicator;
    }

    public void setStatusIndicator(StatusIndicator statusIndicator) {
        this.statusIndicator = statusIndicator;
    }
}
