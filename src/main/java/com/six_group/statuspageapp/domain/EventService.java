package com.six_group.statuspageapp.domain;


import com.six_group.statuspageapp.api.dto.EventDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {




  public List<EventDto> getAllEvents() {
    return null;
//            eventRepository.findAll().stream().map(EventMapper::toDto).toList();
  }

  public EventDto getEventById(String id) {
    return null;
          //  this.eventRepository.findById(id).map(EventMapper::toDto).orElseThrow();

  }

  public EventDto createEvent(EventDto eventDto) {
    return null;
            //EventMapper.toDto(this.eventRepository.save(EventMapper.toBo(eventDto)));
  }


}
