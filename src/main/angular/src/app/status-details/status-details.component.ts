import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {StatusService} from "../services/status.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Participant} from "../model";
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

  protected charts$: Observable<any[] | undefined> | undefined;
  protected chartsContainers$: Observable<string[]> | undefined;
  protected participant$: Observable<Participant>;

  constructor(@Inject(StatusService) private statusService: StatusService,
              @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) {
    this.participant$ = this.activatedRoute.params.pipe(switchMap(params => this.statusService.getStatus(params["participantId"])));
    this.chartsContainers$ = this.participant$.pipe(
      map(p => p.dailyData[0] && p.dailyData[0].services),
      map(s => s.map(s => "chart-" + s.serviceName))
    );
  }
}
