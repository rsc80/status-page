package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.StatusPageAppApplication;
import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.event.Event;
import com.six_group.statuspageapp.domain.event.mapper.EventMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class EventService {

  public List<EventDto> getAllEvents() {
    return StatusPageAppApplication.EVENT_MAP.values().stream()
        .map(EventMapper::toDto)
        .toList();
  }

  public EventDto getEventById(String id) throws IOException {
    return StatusPageAppApplication.EVENT_MAP.values().stream()
        .filter(event -> id.equals(event.id()))
        .map(EventMapper::toDto)
        .findFirst()
        .orElseThrow();
  }

  public EventDto createEvent(EventDto eventDto) {
    Event event = EventMapper.toBo(eventDto);
    StatusPageAppApplication.EVENT_MAP.put(event.id(), event);
    return eventDto;
  }
}
