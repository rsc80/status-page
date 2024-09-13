package com.six_group.statuspageapp.api;


import com.six_group.statuspageapp.api.dto.ApplicationDto;
import com.six_group.statuspageapp.api.dto.EventDto;
import com.six_group.statuspageapp.domain.EventService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
