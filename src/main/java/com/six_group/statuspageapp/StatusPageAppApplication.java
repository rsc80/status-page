package com.six_group.statuspageapp;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redis.om.spring.annotations.EnableRedisDocumentRepositories;
import com.six_group.statuspageapp.domain.participant.Participant;
import com.six_group.statuspageapp.persistence.ParticipantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.List;

@SpringBootApplication
@EnableRedisDocumentRepositories(basePackages = "com.six_group.statuspageapp")
public class StatusPageAppApplication {

    final ParticipantRepository participantRepository;

    public StatusPageAppApplication(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(StatusPageAppApplication.class, args);
    }

    @Bean
    CommandLineRunner loadTestData() {
        return _ -> {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("participant-test-data.json").getInputStream();
            List<Participant> participantList = objectMapper.readValue(inputStream, new TypeReference<>() {});
            this.participantRepository.saveAll(participantList);
        };
    }

}
