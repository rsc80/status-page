package com.six_group.statuspageapp.domain;

import com.six_group.statuspageapp.api.dto.StatusIndicator;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDate;

@RedisHash("Application")
public class Application implements Serializable {
    String id;
    String name;
    LocalDate localDate;
    int hour;
    String latency;
    StatusIndicator statusIndicator;
    int amount200;
    int amount400;
    int amount500;
}
