package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.EventService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<EventDto> getAllEvents() {
        return this.eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable String id) {
        return this.eventService.getEventById(id);
    }

    @PostMapping
    public EventDto createEvent(@RequestBody @Valid EventDto eventDto) {
        return this.eventService.createEvent(eventDto);
    }
}
