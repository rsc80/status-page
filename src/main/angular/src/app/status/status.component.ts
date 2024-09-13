import {Component, Inject, OnInit} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule, StatusBubbleComponent, NgForOf],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  bubbles: Bubble[] = [];

  constructor(@Inject(Router) private router: Router) {
  }

  ngOnInit(): void {
    for (let i = 0; i <= 60; i++) {
      this.bubbles.push({i,status: "SUCCESS"});
    }
  }

  onClickStatusBubble(bubble:Bubble) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["status", bubble.i]);
  }
}

export interface Bubble {
  i:number,
  status: "SUCCESS" | "DEGRADED" | "FAILURE";
}
