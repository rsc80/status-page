package com.six_group.statuspageapp.domain.participant;

import com.redis.om.spring.annotations.Document;
import com.redis.om.spring.annotations.Searchable;
import com.six_group.statuspageapp.api.dto.ParticipantDto;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Document
public class Participant {
    @Id
    private String id;

    @Searchable
    private String name;

    private List<DayData> dailyData = new ArrayList<>();

    public Participant() {
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<DayData> getDailyData() {
        return dailyData;
    }

    public Participant setId(String id) {
        this.id = id;
        return this;
    }

    public Participant setName(String name) {
        this.name = name;
        return this;
    }

    public Participant setDailyData(List<DayData> dailyData) {
        this.dailyData = dailyData;
        return this;
    }

    public ParticipantDto toDto(Participant participant) {
        return new ParticipantDto(
                participant.getId(),
                participant.getName(),
                participant.getDailyData()
        );
    }
}
