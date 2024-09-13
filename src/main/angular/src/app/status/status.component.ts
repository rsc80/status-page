import { Component } from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule, StatusBubbleComponent, NgForOf],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  bubbles: Bubble[] = [{status:"SUCCESS"}, {status:"DEGRADED"}];

}

export interface Bubble {
  status: "SUCCESS" | "DEGRADED" | "FAILURE";
}
