import {Component, Input} from '@angular/core';
import {Bubble} from "../status/status.component";

@Component({
  selector: 'app-status-bubble',
  standalone: true,
  imports: [],
  templateUrl: './status-bubble.component.html',
  styleUrl: './status-bubble.component.scss'
})
export class StatusBubbleComponent {
  @Input() bubble!: Bubble;

}
