export interface StatusItem {
  id: string,
  participantId: string,
  status: "SUCCESS" | "DEGRADED" | "FAILURE" | "NO_DATA";
  rangeStart: Date;
}

export interface StatusRow {
  service: string;
  participantId: string,
  statusIndicator: string,
  items: StatusItem[];
  resolutionMinutes: number;
}

export interface DailyServiceMetrics {
  totalRequests: number;
  totalSuccessCount: number;
  totalClientErrorCount: number;
  totalServerErrorCount: number;
}

export interface HourMetrics {
  successCount: number;
  clientErrorCount: number;
  serverErrorCount: number;
}

export interface Service {
  serviceName: string;
  serviceVersion: string;
  dailyMetrics: DailyServiceMetrics;
  hours: { [key: string]: HourMetrics };
}

export interface ParticipantStatusDetails {
  name: string;
  dayData: DailyData
}

export interface DailyData {
  date: string;
  statusIndicator: "WARNING" | "SUCCESS";
  services: Service[]
}

export interface Participant {
  id: string;
  name: string;
  isExternal: boolean;
  dailyData: DailyData[];
  statusIndicator: "SUCCESS" | "WARNING" | "DANGER";
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  participant?: string;
  eventType: EventType;
  eventStatus: EventStatus;
  start: Date;
  end: Date | null;
  affectedServices?: AffectedService[];
}

export interface AffectedService {
  id: string;
  name: string;
  serviceStatus: "RUNNING_NORMALLY" | "DEGRADED" | "FAILURE" | "NO_DATA";
}

export type EventStatus = "SCHEDULED" | "ONGOING" | "FINISHED";
export type EventType = "MAINTENANCE" | "INCIDENT";
