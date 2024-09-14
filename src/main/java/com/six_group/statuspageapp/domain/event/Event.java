package com.six_group.statuspageapp.domain.event;

import java.time.LocalDateTime;
import java.util.List;

public record Event(String id,
                    String participant,
                    EventType eventType,
                    EventStatus eventStatus,
                    String title,
                    String description,
                    LocalDateTime start,
                    LocalDateTime end,
                    List<AffectedService> affectedServices) {

}
