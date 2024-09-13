package com.six_group.statuspageapp;

import com.redis.om.spring.annotations.EnableRedisDocumentRepositories;
import com.six_group.statuspageapp.api.dto.StatusIndicator;
import com.six_group.statuspageapp.domain.Application;
import com.six_group.statuspageapp.persistence.ApplicationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
@EnableRedisDocumentRepositories(basePackages = "com.six_group.statuspageapp.domain.*")
public class StatusPageAppApplication {

    final
    ApplicationRepository applicationRepository;

    public StatusPageAppApplication(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Bean
    CommandLineRunner loadTestData() {
        return _ -> {
            applicationRepository.deleteAll();
            Result result = getApplications();
            applicationRepository.save(result.ZKB());
            applicationRepository.save(result.CS());
            applicationRepository.save(result.UBS());
        };
    }

    private static Result getApplications() {
        Application ZKB = Application.newInstance(
                "1",
                "ZKB",
                LocalDate.parse("2024-09-01"),
                13,
                StatusIndicator.SUCCESS,
                "200",
                1000,
                2,
                1
        );
        Application CS = Application.newInstance(
                "2",
                "CS",
                LocalDate.parse("2024-09-01"),
                13,
                StatusIndicator.WARNING,
                "400",
                1000,
                2,
                1
        );
        Application UBS = Application.newInstance(
                "3",
                "UBS",
                LocalDate.parse("2024-09-01"),
                13,
                StatusIndicator.DANGER,
                "600",
                1000,
                500,
                500
        );
        Result result = new Result(ZKB, CS, UBS);
        return result;
    }

    private record Result(Application ZKB, Application CS, Application UBS) {
    }

    public static void main(String[] args) {
        SpringApplication.run(StatusPageAppApplication.class, args);

    }
}
