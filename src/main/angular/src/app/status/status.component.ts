import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusBubbleComponent} from "../status-bubble/status-bubble.component";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {StatusRowComponent} from "../status-row/status-row.component";
import {DailyData, StatusItem, StatusRow} from "../model";
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
      items.push({id: '' + i, status: "SUCCESS", rangeStart: new Date()});
    }
    this.statusRows$ = this.statusService.getParticipants().pipe(map(p => {
      return p.map(p => {
        return {
          service: p.name,
          items: p.dailyData.map(this.toItem),
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

  private toItem(dailyData: DailyData): StatusItem {
    function mapStatus(statusIndicator: "WARNING" | "SUCCESS"): "SUCCESS" | "DEGRADED" | "FAILURE" {
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

    return {
      status: mapStatus(dailyData.statusIndicator),
      id: dailyData.date,
      rangeStart: dayjs(dailyData.date).toDate()
    }
  }
}

