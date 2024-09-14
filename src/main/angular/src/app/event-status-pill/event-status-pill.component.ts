import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {EventStatus} from "../events/events.component";

@Component({
  selector: 'app-event-status-pill',
  standalone: true,
  imports: [
    NgSwitchCase,
    UiLibraryAngularModule,
    NgSwitch
  ],
  templateUrl: './event-status-pill.component.html',
  styleUrl: './event-status-pill.component.scss'
})
export class EventStatusPillComponent {
  @Input() status!: EventStatus;
}
