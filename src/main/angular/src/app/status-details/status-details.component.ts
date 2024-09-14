import {Component, Inject, OnInit} from '@angular/core';
import {StatusService} from "../services/status.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {StatusItem, StatusRow} from "../model";
import {StatusRowComponent} from "../status-row/status-row.component";
import {Chart} from "chart.js/auto";
import dayjs from "dayjs";

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
export class StatusDetailsComponent implements OnInit {

  statusRow: StatusRow;
  chart: any;
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

  ngOnInit(): void {
    const getDays = (number: number) => {
      let days = [];
      for (let i = 0; i < number; i++) {
        let day = dayjs().subtract(number - i, "days");
        days.push({
          label: day.format("dddd DD.MM.YYYY"),
          day,
          percentSuccess: 90 + (Math.random() * 10)
        })
      }
      return days;
    }

    let days = getDays(30);
    let labels = days.map(d => d.label);
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: labels,
        datasets: [{
          label: '% Success',
          data: days.map(d => d.percentSuccess),
          backgroundColor: 'rgb(75, 192, 75)',
        }, {
          label: '% Failed',
          data: days.map(d => 100 - d.percentSuccess),
          backgroundColor: 'rgb(192, 75, 75)',
        }]
      },
      options: {
        aspectRatio: 2.5,
        animation: false,
        scales: {
          y: {
            suggestedMin: 0,
            stacked: true
          },
          x: {
            stacked: true
          }
        }
      }

    });
  }

}
