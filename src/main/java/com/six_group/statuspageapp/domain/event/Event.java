package com.six_group.statuspageapp.domain.event;

import java.time.LocalDateTime;
import java.util.List;

public class Event {

  private String id;

  private String participant;

  private EventType eventType;

  private EventStatus eventStatus;

  private LocalDateTime start;

  private LocalDateTime end;

  private List<String> affectedServices;

  public Event() {}

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

  public void setId(String id) {
    this.id = id;
  }

  public String getParticipant() {
    return participant;
  }

  public void setParticipant(String participant) {
    this.participant = participant;
  }

  public EventType getEventType() {
    return eventType;
  }

  public void setEventType(EventType eventType) {
    this.eventType = eventType;
  }

  public EventStatus getEventStatus() {
    return eventStatus;
  }

  public void setEventStatus(EventStatus eventStatus) {
    this.eventStatus = eventStatus;
  }

  public LocalDateTime getStart() {
    return start;
  }

  public void setStart(LocalDateTime start) {
    this.start = start;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }

  public List<String> getAffectedServices() {
    return affectedServices;
  }

  public void setAffectedServices(List<String> affectedServices) {
    this.affectedServices = affectedServices;
  }
}
