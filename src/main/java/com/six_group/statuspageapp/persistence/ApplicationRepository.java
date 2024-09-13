package com.six_group.statuspageapp.persistence;

import com.redis.om.spring.repository.RedisDocumentRepository;
import com.six_group.statuspageapp.domain.Application;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends RedisDocumentRepository<Application, String> {}
