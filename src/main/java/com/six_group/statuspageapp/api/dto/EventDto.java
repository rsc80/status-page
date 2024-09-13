package com.six_group.statuspageapp.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public record EventDto(@NotBlank String id,
                       @NotBlank String participant,
                       @NotBlank String eventType,
                       @NotBlank String eventStatus,
                       @NotNull LocalDateTime start,
                       LocalDateTime end,
                       @NotNull List<String> affectedServices) {

}
