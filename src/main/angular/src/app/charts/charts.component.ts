import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Chart} from "chart.js/auto";
import {ParticipantStatusDetails, Service} from "../model";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    NgIf,
    UiLibraryAngularModule
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnChanges, OnDestroy {

  @Input() canvasIds!: string[];
  @Input() participantStatusDetails!: ParticipantStatusDetails | null;
  protected services: Service[] = [];
  protected charts: { [key: string]: Chart } = {};

  getChart(service: Service) {
    return this.charts[service.serviceName] || this.createChart(service)
  }

  getCanvasId(service: Service): string {
    return `chart-${service.serviceName}`;
  }

  ngOnDestroy(): void {
    Object.keys(this.charts).forEach(serviceName => this.charts[serviceName].destroy());
  }

  ngOnChanges(): void {
    if (this.participantStatusDetails) {
      this.services = this.participantStatusDetails && this.participantStatusDetails.dayData && this.participantStatusDetails.dayData.services || [];
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

    let chart = new Chart(canvasId, {
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
    this.charts[service.serviceName] = chart;
    return chart;
  }

}
