package com.six_group.statuspageapp.domain;

import com.redis.om.spring.annotations.Document;
import com.redis.om.spring.annotations.Searchable;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

@Document
public class Event {

  @Id
  private final String id;

  @Searchable
  private String participant;

  @Indexed
  private EventType eventType;

  @Indexed
  private EventStatus eventStatus;

  @Indexed
  private LocalDateTime start;

  @Indexed
  private LocalDateTime end;

  @Indexed
  private List<String> affectedServices;

  public Event(String id, String participant, EventType eventType, EventStatus eventStatus,
      LocalDateTime start, LocalDateTime end, List<String> affectedServices) {
    this.id = id;
    this.participant = participant;
    this.eventType = eventType;
    this.eventStatus = eventStatus;
    this.start = start;
    this.end = end;
    this.affectedServices = affectedServices;
  }

  public String getId() {
    return id;
  }

  public String getParticipant() {
    return participant;
  }

  public EventType getEventType() {
    return eventType;
  }

  public EventStatus getEventStatus() {
    return eventStatus;
  }

  public LocalDateTime getStart() {
    return start;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public List<String> getAffectedServices() {
    return affectedServices;
  }
}
