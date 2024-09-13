package com.six_group.statuspageapp.api.dto;

import java.time.LocalDate;

public record ApplicationDto(
        String id,
        String name,
        LocalDate localDate,
        int hour,
        String latency,
        StatusIndicator statusIndicator,
        int amount200,
        int amount400,
        int amount500
) {


}
