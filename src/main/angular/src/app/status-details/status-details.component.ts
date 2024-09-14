import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {StatusService} from "../services/status.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DailyData} from "../model";
import {StatusRowComponent} from "../status-row/status-row.component";
import {ChartsComponent} from "../charts/charts.component";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

@Component({
  selector: 'app-status-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    StatusRowComponent,
    NgForOf,
    ChartsComponent,
    UiLibraryAngularModule
  ],
  templateUrl: './status-details.component.html',
  styleUrl: './status-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusDetailsComponent {

  protected chartsContainers$: Observable<string[]> | undefined;
  protected dailyData$: Observable<DailyData>;

  constructor(@Inject(StatusService) private statusService: StatusService,
              @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) {
    this.dailyData$ = this.activatedRoute.params.pipe(switchMap(params => this.statusService.getStatus(params["participantId"], params["day"])));
    this.chartsContainers$ = this.dailyData$.pipe(
      map(p => p.services),
      map(s => s.map(s => "chart-" + s.serviceName))
    );
  }
}
