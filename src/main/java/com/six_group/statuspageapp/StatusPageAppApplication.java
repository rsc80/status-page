package com.six_group.statuspageapp;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.six_group.statuspageapp.domain.event.Event;
import com.six_group.statuspageapp.domain.participant.Participant;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class StatusPageAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(StatusPageAppApplication.class, args);
    }

    public final static Map<String, Participant> PARTICIPANT_MAP = new HashMap<>();
    public static final Map<String, Event> EVENT_MAP = new HashMap<>();

    @Bean
    CommandLineRunner loadTestData() {
        return strings -> {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

            InputStream participantInputStream = new ClassPathResource("participant-test-data.json").getInputStream();
            List<Participant> participants = objectMapper.readValue(participantInputStream, new TypeReference<>() {
            });
            participants.forEach(participant -> PARTICIPANT_MAP.put(participant.getId(), participant));

            InputStream eventInputStream = new ClassPathResource("event-test-data.json").getInputStream();
            List<Event> events = objectMapper.readValue(eventInputStream, new TypeReference<>() {
            });
            events.forEach(event -> EVENT_MAP.put(event.getId(), event));
        };
    }


}
