package com.six_group.statuspageapp.domain.event.mapper;


import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.event.Event;
import com.six_group.statuspageapp.domain.event.EventStatus;
import com.six_group.statuspageapp.domain.event.EventType;

public final class EventMapper {

  private EventMapper() {}

  public static Event toBo(EventDto eventDto) {
    return new Event(
        eventDto.id(),
        eventDto.participant(),
        EventType.valueOf(eventDto.eventType()),
        EventStatus.valueOf(eventDto.eventStatus()),
        eventDto.title(),
        eventDto.description(),
        eventDto.start(),
        eventDto.end(),
        AffectedServiceMapper.toBoList(eventDto.affectedServices())
    );
  }

  public static EventDto toDto(Event event) {
    return new EventDto(
        event.id(),
        event.participant(),
        event.eventType().name(),
        event.eventStatus().name(),
        event.title(),
        event.description(),
        event.start(),
        event.end(),
        AffectedServiceMapper.toDtoList(event.affectedServices())
    );
  }
}
