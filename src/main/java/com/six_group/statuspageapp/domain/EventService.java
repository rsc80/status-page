package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.mapper.EventMapper;
import com.six_group.statuspageapp.persistence.EventRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class EventService {

  private final EventRepository eventRepository;

  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public List<EventDto> getAllEvents() {
    return eventRepository.findAll().stream().map(EventMapper::toDto).toList();
  }

  public EventDto getEventById(String id) {
    return this.eventRepository.findById(id).map(EventMapper::toDto).orElseThrow();
  }

  public EventDto createEvent(EventDto eventDto) {
    return EventMapper.toDto(this.eventRepository.save(EventMapper.toBo(eventDto)));
  }


}
