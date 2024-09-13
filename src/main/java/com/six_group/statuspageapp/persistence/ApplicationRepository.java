package com.six_group.statuspageapp.persistence;

import com.six_group.statuspageapp.domain.Application;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends CrudRepository<Application, String> {}
