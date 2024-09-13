package com.six_group.statuspageapp.persistence;

import com.redis.om.spring.repository.RedisDocumentRepository;
import com.six_group.statuspageapp.domain.Application;
import com.six_group.statuspageapp.domain.Event;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends RedisDocumentRepository<Event, String> {}
