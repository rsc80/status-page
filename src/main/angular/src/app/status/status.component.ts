import {Component, Inject} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {StatusRowComponent} from "../status-row/status-row.component";
import {StatusItem, StatusRow} from "../model";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule, StatusBubbleComponent, NgForOf, StatusRowComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  blinkStatus: StatusRow;
  statusRows: StatusRow[] = [];

  constructor(@Inject(Router) private router: Router) {
    let items: StatusItem[] = [];
    for (let i = 0; i <= 60; i++) {
      items.push({id: '' + i, status: "SUCCESS", rangeStart: new Date()});
    }
    this.statusRows.push({service: "Participant A", items, resolutionMinutes: 60 * 24});
    this.statusRows.push({service: "Participant B", items, resolutionMinutes: 60 * 24});
    this.statusRows.push({service: "Participant C", items, resolutionMinutes: 60 * 24});
    this.blinkStatus = {service: "bLink", items, resolutionMinutes: 60 * 24};
  }

  onClickStatusBubble(bubble: StatusItem) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["status", bubble.id]);
  }
}

