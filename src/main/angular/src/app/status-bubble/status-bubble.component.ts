import {Component, Input} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {StatusItem} from "../model";

@Component({
  selector: 'app-status-bubble',
  standalone: true,
  imports: [
    NgIf,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './status-bubble.component.html',
  styleUrl: './status-bubble.component.scss'
})
export class StatusBubbleComponent {
  @Input() statusItem!: StatusItem;

}
