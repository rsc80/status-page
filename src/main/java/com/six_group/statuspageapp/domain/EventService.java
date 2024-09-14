package com.six_group.statuspageapp.domain;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.six_group.statuspageapp.StatusPageAppApplication;
import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.event.Event;
import com.six_group.statuspageapp.domain.event.mapper.EventMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

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
