import {Component, Inject} from '@angular/core';
import {StatusService} from "../services/status.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {StatusItem} from "../model";

@Component({
  selector: 'app-status-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './status-details.component.html',
  styleUrl: './status-details.component.scss'
})
export class StatusDetailsComponent {

  protected statusItem$: Observable<StatusItem>;

  constructor(@Inject(StatusService) private statusService: StatusService,
              @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) {
    this.statusItem$ = this.activatedRoute.params.pipe(switchMap(params => this.statusService.getStatus(params["id"])));
  }

}
