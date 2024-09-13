import {Component, Inject} from '@angular/core';
import {StatusService} from "../services/status.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {StatusItem, StatusRow} from "../model";
import {StatusRowComponent} from "../status-row/status-row.component";

@Component({
  selector: 'app-status-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    StatusRowComponent
  ],
  templateUrl: './status-details.component.html',
  styleUrl: './status-details.component.scss'
})
export class StatusDetailsComponent {

  statusRow: StatusRow;
  protected statusItem$: Observable<StatusItem>;

  constructor(@Inject(StatusService) private statusService: StatusService,
              @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) {
    this.statusItem$ = this.activatedRoute.params.pipe(switchMap(params => this.statusService.getStatus(params["id"])));
    let items: StatusItem[] = [];
    for (let i = 0; i <= 24; i++) {
      items.push({id: '' + i, status: "SUCCESS", rangeStart: new Date()});
    }
    this.statusRow = {items, service: "test", resolutionMinutes: 60};

  }

}
