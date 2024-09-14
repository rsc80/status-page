import {Component} from '@angular/core';
import {Event} from "../events/events.component";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Observable, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../services/event.service";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {EventStatusPillComponent} from "../event-status-pill/event-status-pill.component";
import {EventTypeBadgeComponent} from "../event-type-badge/event-type-badge.component";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    NgIf,
    AsyncPipe,
    NgSwitchCase,
    NgSwitch,
    UiLibraryAngularModule,
    NgForOf,
    EventStatusPillComponent,
    EventTypeBadgeComponent
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  protected event$: Observable<Event>;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    this.event$ = this.activatedRoute.params.pipe(
      switchMap(params => this.eventService.getEvent(params["id"])));
  }
}
