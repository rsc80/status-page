package com.six_group.statuspageapp.domain;

import com.redis.om.spring.annotations.Document;
import com.redis.om.spring.annotations.Searchable;
import com.six_group.statuspageapp.api.dto.ApplicationDto;
import com.six_group.statuspageapp.api.dto.StatusIndicator;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDate;

@Document
public class Application {
    @Id
    private String id;

    @Searchable
    private String name;

    @Indexed
    private LocalDate localDate;

    @Indexed
    private Integer hour;

    private StatusIndicator indicator;

    @Indexed
    private String latency;

    @Indexed
    private Integer amountOf200;

    @Indexed
    private Integer amountOf400;

    @Indexed
    private Integer amountOf500;

    public Application() {
    }

    public static Application newInstance(String id, String name, LocalDate localDate, Integer hour, StatusIndicator indicator, String latency,  Integer amountOf200, Integer amountOf400, Integer amountOf500) {
        return new Application(id, name, localDate, hour, indicator, latency, amountOf200, amountOf400, amountOf500);
    }

    private Application(String id, String name, LocalDate localDate, Integer hour, StatusIndicator indicator, String latency,  Integer amountOf200, Integer amountOf400, Integer amountOf500) {
        this.id = id;
        this.name = name;
        this.localDate = localDate;
        this.hour = hour;
        this.indicator = indicator;
        this.latency = latency;
        this.amountOf200 = amountOf200;
        this.amountOf400 = amountOf400;
        this.amountOf500 = amountOf500;
    }

    public String getLatency() {
        return latency;
    }
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public Integer getHour() {
        return hour;
    }

    public StatusIndicator getIndicator() {
        return indicator;
    }

    public Integer getAmountOf200() {
        return amountOf200;
    }

    public Integer getAmountOf400() {
        return amountOf400;
    }

    public Integer getAmountOf500() {
        return amountOf500;
    }

    ApplicationDto toDto(Application application){
        return new ApplicationDto(application.getId(),
                application.getName(),
                application.getLocalDate(),
                application.getHour(),
                application.getLatency(),
                application.getIndicator(),
                application.getAmountOf200(),
                application.getAmountOf400(),
                application.getAmountOf500()
        );
    }
}
