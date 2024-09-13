import {Component, Inject, OnInit} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {StatusRowComponent} from "../status-row/status-row.component";
import {StatusItem} from "../model";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule, StatusBubbleComponent, NgForOf, StatusRowComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  statusItems: StatusItem[] = [];

  constructor(@Inject(Router) private router: Router) {
  }

  ngOnInit(): void {
    for (let i = 0; i <= 60; i++) {
      this.statusItems.push({id: '' + i, status: "SUCCESS"});
    }
  }

  onClickStatusBubble(bubble: StatusItem) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["status", bubble.id]);
  }
}

