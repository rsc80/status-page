import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";

import {StatusItem, StatusRow} from "../model";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

@Component({
  selector: 'app-status-row',
  standalone: true,
  imports: [
    NgForOf,
    StatusBubbleComponent,
    DatePipe,
    UiLibraryAngularModule,
    NgIf
  ],
  templateUrl: './status-row.component.html',
  styleUrl: './status-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
