package com.six_group.statuspageapp.domain.event.mapper;

import com.six_group.statuspageapp.api.dto.AffectedServiceDto;
import com.six_group.statuspageapp.domain.event.AffectedService;
import com.six_group.statuspageapp.domain.event.ServiceStatus;
import java.util.List;

public final class AffectedServiceMapper {

  private AffectedServiceMapper() {
  }

  public static List<AffectedService> toBoList(List<AffectedServiceDto> dtoLaffectedServiceDtosst) {
    return dtoLaffectedServiceDtosst.stream()
        .map(AffectedServiceMapper::toBo)
        .toList();
  }

  public static List<AffectedServiceDto> toDtoList(List<AffectedService> affectedServices) {
    return affectedServices.stream()
        .map(AffectedServiceMapper::toDto)
        .toList();
  }

  private static AffectedService toBo(AffectedServiceDto affectedServiceDto) {
    return new AffectedService(
        affectedServiceDto.name(),
        ServiceStatus.valueOf(affectedServiceDto.serviceStatus())
    );
  }

  private static AffectedServiceDto toDto(AffectedService affectedService) {
    return new AffectedServiceDto(
        affectedService.name(),
        affectedService.name()
    );
  }
}
