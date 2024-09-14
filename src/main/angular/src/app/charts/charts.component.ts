import {Component, Input, OnChanges} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {Chart} from "chart.js/auto";
import {Participant, Service} from "../model";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnChanges {

  @Input() containers!: string[];
  @Input() participant!: Participant | null;
  protected charts: Chart[] = [];
  protected services: Service[] = [];

  getChart(service: Service) {
    return this.createChart(service)
  }

  getCanvasId(service: Service): string {
    return `chart-${service.serviceName}`;
  }

  ngOnChanges(): void {
    if (this.participant) {
      this.services = this.participant.dailyData[0] && this.participant.dailyData[0].services || [];
    }
  }

  private createChart(service: Service) {
    function extract(service: Service, hour: string) {
      let hourData = service.hours[hour];
      return {
        hourData: hourData,
        total: hourData.successCount + hourData.clientErrorCount + hourData.serverErrorCount
      };
    }

    let labels = Object.keys(service.hours);
    let hoursSuccess = labels.map(hour => {
      const hourForChart = extract(service, hour);
      return hourForChart.hourData.successCount / hourForChart.total;
    });
    let hoursFailures = labels.map(hour => {
      const hourForChart = extract(service, hour);
      return (hourForChart.hourData.serverErrorCount + hourForChart.hourData.serverErrorCount) / hourForChart.total;
    });

    let canvasId = this.getCanvasId(service);
    console.log("chartId", canvasId);

    return new Chart(canvasId, {
      type: 'bar',

      data: {
        labels: labels,
        datasets: [{
          label: '% Success',
          data: hoursSuccess,
          backgroundColor: 'rgb(75, 192, 75)',
        }, {
          label: '% Failed',
          data: hoursFailures,
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
