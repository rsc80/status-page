package com.six_group.statuspageapp.api.dto;

public class Incident {

    private String name;
    private String description;
    private Timespan timespan;
    private Severity severity;
    private IncidentStatus status;

    public Incident() {
    }

    public Incident(String name, String description, Timespan timespan, Severity severity, IncidentStatus status) {
        this.name = name;
        this.description = description;
        this.timespan = timespan;
        this.severity = severity;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timespan getTimespan() {
        return timespan;
    }

    public void setTimespan(Timespan timespan) {
        this.timespan = timespan;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public IncidentStatus getStatus() {
        return status;
    }

    public void setStatus(IncidentStatus status) {
        this.status = status;
    }
}
