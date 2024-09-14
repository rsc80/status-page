package com.six_group.statuspageapp.domain;

import java.time.LocalDateTime;
import java.util.List;

public class Event {

  private final String id;

  private String participant;

  private EventType eventType;

  private EventStatus eventStatus;

  private LocalDateTime start;

  private LocalDateTime end;

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
