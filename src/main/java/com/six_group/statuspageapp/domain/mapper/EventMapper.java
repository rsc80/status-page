package com.six_group.statuspageapp.domain.mapper;


import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.Event;
import com.six_group.statuspageapp.domain.EventStatus;
import com.six_group.statuspageapp.domain.EventType;

public final class EventMapper {

  private EventMapper() {}

  public static Event toBo(EventDto eventDto) {
    return new Event(
        eventDto.id(),
        eventDto.participant(),
        EventType.valueOf(eventDto.eventType()),
        EventStatus.valueOf(eventDto.eventStatus()),
        eventDto.start(),
        eventDto.end(),
        eventDto.affectedServices()
    );
  }

  public static EventDto toDto(Event event) {
    return new EventDto(
        event.getId(),
        event.getParticipant(),
        event.getEventType().name(),
        event.getEventStatus().name(),
        event.getStart(),
        event.getEnd(),
        event.getAffectedServices()
    );
  }
}
