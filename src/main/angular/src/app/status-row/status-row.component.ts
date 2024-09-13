import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";

import {StatusItem, StatusRow} from "../model";

@Component({
  selector: 'app-status-row',
  standalone: true,
  imports: [
    NgForOf,
    StatusBubbleComponent,
    DatePipe
  ],
  templateUrl: './status-row.component.html',
  styleUrl: './status-row.component.scss'
})
export class StatusRowComponent {

  @Output()
  bubbleClick = new EventEmitter<StatusItem>();

  @Input()
  statusRow!: StatusRow;

  onClickStatusBubble(bubble: StatusItem) {
    this.bubbleClick.emit(bubble);
  }
}
