import {Component} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Observable} from 'rxjs';
import {EventService} from "../services/event.service";
import {EventStatusPillComponent} from "../event-status-pill/event-status-pill.component";
import {EventTypeBadgeComponent} from "../event-type-badge/event-type-badge.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    UiLibraryAngularModule,
    NgForOf,
    DatePipe,
    RouterLink,
    AsyncPipe,
    EventStatusPillComponent,
    EventTypeBadgeComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events$: Observable<Event[]>;

  constructor(private eventService: EventService) {
    this.events$ = this.eventService.getEvents();
  }
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  type: EventType;
  status: EventStatus;
  startDate: Date;
  endDate: Date | null;
  affectedServices?: Service[];
}

export interface Service {
  id: string;
  name: string;
  status: "SUCCESS" | "DEGRADED" | "FAILURE";
}

export type EventStatus = "Scheduled" | "Ongoing" | "Done";
export type EventType = "Maintenance" | "Incident";
