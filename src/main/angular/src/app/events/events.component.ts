import {Component} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import {EventService} from "../services/event.service";
import {EventStatusPillComponent} from "../event-status-pill/event-status-pill.component";
import {EventTypeBadgeComponent} from "../event-type-badge/event-type-badge.component";
import {Event, EventType} from "../model";

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
    EventTypeBadgeComponent,
    NgIf
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events$: Observable<Event[]>;
  filteredEventType$ = new BehaviorSubject<EventType | null>(null);

  constructor(private eventService: EventService) {
    this.events$ = this.filteredEventType$.pipe(
      switchMap(eventType => this.eventService.getEvents().pipe(
        map((events: Event[]) => eventType != null
          ? events.filter(event => event.eventType === eventType)
          : events
        )
      ))
    );
  }

  filterEventType(eventType: EventType) {
    eventType === this.filteredEventType$.value
      ? this.filteredEventType$.next(null)
      : this.filteredEventType$.next(eventType);
  }
}

