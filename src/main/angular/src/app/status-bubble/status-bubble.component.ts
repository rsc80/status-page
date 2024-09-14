import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {StatusItem} from "../model";

@Component({
  selector: 'app-status-bubble',
  standalone: true,
  imports: [
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgClass
  ],
  templateUrl: './status-bubble.component.html',
  styleUrl: './status-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBubbleComponent {
  @Input() statusItem!: StatusItem;
  @Input() large!: boolean;

}
