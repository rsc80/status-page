import {Component} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BehaviorSubject, Observable, of, switchMap, withLatestFrom} from 'rxjs';
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
  filteredEventType$ = new BehaviorSubject<EventType | null>(null);

  constructor(private eventService: EventService) {
    this.events$ = this.filteredEventType$.pipe(
      withLatestFrom(this.eventService.getEvents()),
      switchMap(([eventType, events]) => {
        return eventType != null
          ? of(events.filter(event => event.eventType === eventType))
          : of(events);
      })
    );
  }

  filterEventType(eventType: EventType) {
    eventType === this.filteredEventType$.value
      ? this.filteredEventType$.next(null)
      : this.filteredEventType$.next(eventType);
  }
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  participant?: string;
  eventType: EventType;
  eventStatus: EventStatus;
  start: Date;
  end: Date | null;
  affectedServices?: Service[];
}

export interface Service {
  id: string;
  name: string;
  status: "SUCCESS" | "DEGRADED" | "FAILURE";
}

export type EventStatus = "Scheduled" | "Ongoing" | "Done";
export type EventType = "Maintenance" | "Incident";
