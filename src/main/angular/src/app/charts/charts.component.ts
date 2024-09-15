import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Chart} from "chart.js/auto";
import {ParticipantStatusDetails, Service} from "../model";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {LatencyWidgetComponent} from "../latency-widget/latency-widget.component";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    NgIf,
    UiLibraryAngularModule,
    LatencyWidgetComponent
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnChanges, OnDestroy {

  @Input() canvasIds!: string[];
  @Input() participantStatusDetails!: ParticipantStatusDetails | null;
  protected services: Service[] = [];
  protected barCharts: { [key: string]: Chart } = {};
  protected pieCharts: { [key: string]: Chart } = {};

  getBarChart(service: Service) {
    return this.barCharts[service.serviceName] || this.createBarChart(service)
  }

  getPieChart(service: Service) {
    return this.pieCharts[service.serviceName] || this.createPieChart(service)
  }

  getCanvasId(service: Service): string {
    return `chart-${service.serviceName}`;
  }

  ngOnDestroy(): void {
    Object.keys(this.barCharts).forEach(serviceName => this.barCharts[serviceName].destroy());
    Object.keys(this.pieCharts).forEach(serviceName => this.pieCharts[serviceName].destroy());
  }

  ngOnChanges(): void {
    if (this.participantStatusDetails) {
      this.services = this.participantStatusDetails && this.participantStatusDetails.dayData && this.participantStatusDetails.dayData.services || [];
    }
  }

  private createBarChart(service: Service) {
    function extract(service: Service, hour: string) {
      let hourData = service.hours[hour];
      return {
        hourData: hourData || {successCount: 0, clientErrorCount: 0, serverErrorCount: 0},
        total: hourData && (hourData.successCount + hourData.clientErrorCount + hourData.serverErrorCount) || 0
      };
    }

    let labels = [];
    for (let h = 0; h < 24; h++) {
      labels.push((h + '').padStart(2, '0') + ":00");
    }
    // let labels = Object.keys(service.hours).sort((a, b) => a < b ? -1 : 1);
    let hoursSuccess = labels.map(hour => {
      const hourForChart = extract(service, hour);
      if (hourForChart.total === 0) {
        return null;
      }
      return 100 * (hourForChart.hourData.successCount + hourForChart.hourData.clientErrorCount) / hourForChart.total;
    });
    let hoursFailures = labels.map(hour => {
      const hourForChart = extract(service, hour);
      if (hourForChart.total === 0) {
        return null;
      }
      return 100 * (hourForChart.hourData.serverErrorCount) / hourForChart.total;
    });

    let canvasId = this.getCanvasId(service);

    let chart = new Chart(canvasId, {
      type: 'bar',

      data: {
        labels: labels,
        datasets: [{
          label: '% Success',
          data: hoursSuccess,
          backgroundColor: 'rgba(52, 211, 153, 0.5)',
          borderColor: 'rgba(52, 211, 153,1)',
          borderWidth: 1,
          borderRadius: 3
        }, {
          label: '% Failed',
          data: hoursFailures,
          backgroundColor: 'rgba(248, 113, 113,0.5)',
          borderColor: 'rgba(248, 113, 113,1)',
          borderWidth: 1,
          borderRadius: 3
        }]
      },
      options: {
        aspectRatio: 2.5,
        animation: false,
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
            stacked: true,
            ticks: {
              callback: (value, index, ticks) => {
                return value + "%";
              }
            }
          },
          x: {
            stacked: true
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    this.barCharts[service.serviceName] = chart;
    return chart;
  }


  private createPieChart(service: Service) {
    let canvasId = this.getCanvasId(service);
    let chart = new Chart("pie-" + canvasId, {
      type: 'doughnut',

      data: {
        labels: [
          'Server Errors',
          'Success',
          'Client Errors'
        ],
        datasets: [{
          label: 'API-Calls',
          data: [
            service.dailyMetrics.totalServerErrorCount,
            service.dailyMetrics.totalSuccessCount,
            service.dailyMetrics.totalClientErrorCount
          ],
          backgroundColor: [
            'rgba(248, 113, 113,0.5)',
            'rgba(52, 211, 153, 0.5)',
            'rgba(134, 239, 172, 0.5)'
          ],
          borderColor: [
            'rgb(248, 113, 113)',
            'rgb(52, 211, 153)',
            'rgb(134, 239, 172)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start'
          }
        }
      }
    }) as Chart;
    this.pieCharts[service.serviceName] = chart;
    return chart;
  }

}
