import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {StatusService} from "../services/status.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ParticipantStatusDetails} from "../model";
import {StatusRowComponent} from "../status-row/status-row.component";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {ChartsComponent} from "../charts/charts.component";

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

  protected canvasIds$: Observable<string[]> | undefined;
  protected participantStatusDetails$: Observable<ParticipantStatusDetails>;

  constructor(@Inject(StatusService) private statusService: StatusService,
              @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) {
    this.participantStatusDetails$ = this.activatedRoute.params.pipe(switchMap(params => this.statusService.getStatus(params["participantId"], params["day"])));
    this.canvasIds$ = this.participantStatusDetails$.pipe(
      map(p => p.dayData && p.dayData.services || []),
      map(s => s.map(s => "chart-" + s.serviceName))
    );
  }
}
