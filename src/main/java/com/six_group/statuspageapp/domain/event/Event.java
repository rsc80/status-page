package com.six_group.statuspageapp.domain.event;

import java.time.LocalDateTime;
import java.util.List;

public record Event(String id,
                    String participant,
                    EventType eventType,
                    EventStatus eventStatus,
                    LocalDateTime start,
                    LocalDateTime end,
                    List<AffectedService> affectedServices) {

}
