package com.six_group.statuspageapp.domain;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

  private final ObjectMapper objectMapper;

  public EventService() {
    objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
  }

  public List<EventDto> getAllEvents() throws IOException {
    InputStream inputStream = new ClassPathResource("event-test-data.json").getInputStream();

    List<Event> events = objectMapper.readValue(inputStream, new TypeReference<>() {
    });

    return events.stream().map(EventMapper::toDto).toList();
  }

  public EventDto getEventById(String id) throws IOException {
    InputStream inputStream = new ClassPathResource("event-test-data.json").getInputStream();

    List<Event> events = objectMapper.readValue(inputStream, new TypeReference<>() {
    });

    return events.stream()
        .filter(event -> id.equals(event.getId()))
        .map(EventMapper::toDto)
        .findFirst()
        .orElseThrow();
  }

  public EventDto createEvent(EventDto eventDto) {
    return null;
    //EventMapper.toDto(this.eventRepository.save(EventMapper.toBo(eventDto)));
  }


}
