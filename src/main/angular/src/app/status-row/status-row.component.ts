import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";

import {StatusItem} from "../model";

@Component({
  selector: 'app-status-row',
  standalone: true,
  imports: [
    NgForOf,
    StatusBubbleComponent
  ],
  templateUrl: './status-row.component.html',
  styleUrl: './status-row.component.scss'
})
export class StatusRowComponent {

  @Output()
  bubbleClick = new EventEmitter<StatusItem>();
  @Input()
  bubbles!: StatusItem[];

  onClickStatusBubble(bubble: StatusItem) {
    this.bubbleClick.emit(bubble);
  }
}
