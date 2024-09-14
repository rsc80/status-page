import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {EventType} from "../model";

@Component({
  selector: 'app-event-type-badge',
  standalone: true,
  imports: [
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './event-type-badge.component.html',
  styleUrl: './event-type-badge.component.scss'
})
export class EventTypeBadgeComponent {
  @Input() type!: EventType;
}
