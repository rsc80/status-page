package com.six_group.statuspageapp.api.dto;

public enum StatusIndicator {
  SUCCESS(0),
  WARNING(50),
  DANGER(100);

  private final int weight;

  StatusIndicator(int weight) {
    this.weight = weight;
  }

  public StatusIndicator getWorse(StatusIndicator other) {
    if (other.weight > weight) {
      return other;
    }
    return this;
  }

}
