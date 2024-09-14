package com.six_group.statuspageapp.persistence;

import com.redis.om.spring.repository.RedisDocumentRepository;
import com.six_group.statuspageapp.domain.participant.Participant;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends RedisDocumentRepository<Participant, String> {}
