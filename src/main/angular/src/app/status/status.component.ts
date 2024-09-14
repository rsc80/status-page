import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {StatusRowComponent} from "../status-row/status-row.component";
import {Participant, StatusItem, StatusRow} from "../model";
import {StatusService} from "../services/status.service";
import {map, Observable} from "rxjs";
import dayjs from "dayjs";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule, StatusBubbleComponent, NgForOf, StatusRowComponent, AsyncPipe, CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent {
  blinkStatus: StatusRow;
  statusRows$: Observable<StatusRow[]>;

  constructor(@Inject(Router) private router: Router,
              @Inject(StatusService) private statusService: StatusService) {
    let items: StatusItem[] = [];
    for (let i = 0; i <= 60; i++) {
      items.push({id: '' + i, status: "NO_DATA", rangeStart: dayjs().subtract(60 - i, "days").toDate()});
    }
    this.statusRows$ = this.statusService.getParticipants().pipe(map(p => {
      return p.map(p => {
        return {
          service: p.name,
          items: [...items.map(i => this.toStatusItems(i, p))],
          resolutionMinutes: 60
        } as StatusRow;
      })
    }));
    this.blinkStatus = {service: "bLink", items, resolutionMinutes: 60 * 24};
  }

  onClickStatusBubble(bubble: StatusItem) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["status", bubble.id]);
  }

  private toStatusItems(emptyStatusItem: StatusItem, p: Participant) {
    let dailyData = p.dailyData.filter(d => {
      console.log("emptyStatusItem.rangeStart", emptyStatusItem.rangeStart);
      let isSame = dayjs(d.date).isSame(dayjs(emptyStatusItem.rangeStart), "day");
      return isSame;
    })[0];
    return dailyData && {
      status: this.mapStatus(dailyData.statusIndicator),
      id: dailyData.date,
      rangeStart: dayjs(dailyData.date).toDate()
    } || emptyStatusItem;
  }

  private mapStatus(statusIndicator: "WARNING" | "SUCCESS"): "SUCCESS" | "DEGRADED" | "FAILURE" {
    switch (statusIndicator) {
      case "SUCCESS": {
        return "SUCCESS";
      }
      case "WARNING": {
        return "DEGRADED"
      }
      default: {
        return "DEGRADED"
      }
    }
  }

}

