package com.six_group.statuspageapp;

import com.redis.om.spring.annotations.EnableRedisDocumentRepositories;
import com.six_group.statuspageapp.api.dto.StatusIndicator;
import com.six_group.statuspageapp.domain.Application;
import com.six_group.statuspageapp.persistence.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
@EnableRedisDocumentRepositories(basePackages = "com.six_group.statuspageapp.domain.*")
public class StatusPageAppApplication {

  @Autowired
  ApplicationRepository applicationRepository;

  @Bean
  CommandLineRunner loadTestData() {
    return args -> {
      applicationRepository.deleteAll();
      Application cs = Application.newInstance("Redis", "https://redis.com", LocalDate.of("2024-09-01"), 23, StatusIndicator.SUCCESS, );
      applicationRepository.save(cs);
    };
  }
  public static void main(String[] args) {
    SpringApplication.run(StatusPageAppApplication.class, args);

  }
}
