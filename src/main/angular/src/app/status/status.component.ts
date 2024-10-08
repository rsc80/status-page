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
import {IncidentHistoryComponent} from "../incident-history/incident-history.component";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule, StatusBubbleComponent, NgForOf, StatusRowComponent, AsyncPipe, CommonModule, IncidentHistoryComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent {
  internalServices$: Observable<StatusRow[]>;
  externalServices$: Observable<StatusRow[]>;

  constructor(@Inject(Router) private router: Router,
              @Inject(StatusService) private statusService: StatusService) {
    let items: StatusItem[] = [];
    for (let i = 0; i <= 60; i++) {
      items.push({
        participantId: 'unknown',
        id: '' + i,
        status: "NO_DATA",
        rangeStart: dayjs().subtract(60 - i, "days").toDate(),
        statistics: {
          percentSuccess: 0,
          successCount: 0,
          failureCount: 0,
          totalCount: 0
        }
      });
    }
    let participants$ = this.statusService.getParticipants();
    this.externalServices$ = participants$.pipe(
      map(p => p.filter(p => p.isExternal).map(this.enrich(items))));
    this.internalServices$ = participants$.pipe(
      map(p => p.filter(p => !p.isExternal).map(this.enrich(items))));
  }

  onClickStatusBubble(statusItem: StatusItem) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["status", statusItem.participantId, statusItem.id]);
  }

  private enrich(items: StatusItem[]) {
    return (p: Participant) => {
      return {
        participantId: p.id,
        participantName: p.name,
        statusLine: p.statusLine,
        items: [...items.map(item => this.toStatusItems(item, p))],
        resolutionMinutes: 60
      } as StatusRow;
    };
  }

  private toStatusItems(emptyStatusItem: StatusItem, participant: Participant) {
    let enrichedDailyData = participant.dailyData.filter(d => dayjs(d.date).isSame(dayjs(emptyStatusItem.rangeStart), "day"))[0];
    if (enrichedDailyData) {
      let successCount = enrichedDailyData.services.map(s => s.dailyMetrics.totalSuccessCount + s.dailyMetrics.totalClientErrorCount).reduce((a, b) => a + b);
      let failureCount = enrichedDailyData.services.map(s => s.dailyMetrics.totalServerErrorCount).reduce((a, b) => a + b);
      let totalCount = enrichedDailyData.services.map(s => s.dailyMetrics.totalRequests).reduce((a, b) => a + b);
      return {
        participantId: participant.id,
        status: this.mapStatus(enrichedDailyData.statusIndicator),
        id: enrichedDailyData.date,
        rangeStart: dayjs(enrichedDailyData.date).toDate(),
        statistics: {
          percentSuccess: Math.round(100 * (totalCount > 0 && successCount / totalCount || 0)),
          successCount,
          failureCount,
          totalCount
        }
      }
    } else {
      return {
        ...emptyStatusItem,
        participantId: participant.id
      };
    }
  }

  private mapStatus(statusIndicator: "WARNING" | "SUCCESS" | "DANGER"): "SUCCESS" | "DEGRADED" | "FAILURE" {
    switch (statusIndicator) {
      case "SUCCESS": {
        return "SUCCESS";
      }
      case "WARNING": {
        return "DEGRADED"
      }
      case "DANGER": {
        return "FAILURE"
      }
      default: {
        return "DEGRADED"
      }
    }
  }

}

