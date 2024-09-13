import {Component, Input} from '@angular/core';
import {Bubble} from "../status/status.component";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";

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
  @Input() bubble!: Bubble;

}
