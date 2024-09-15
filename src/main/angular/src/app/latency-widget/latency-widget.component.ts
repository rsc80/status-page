import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {Service} from "../model";

@Component({
  selector: 'app-latency-widget',
  standalone: true,
  imports: [
    NgIf,
    UiLibraryAngularModule,
    NgSwitch,
    NgSwitchCase,
    NgClass
  ],
  templateUrl: './latency-widget.component.html',
  styleUrl: './latency-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatencyWidgetComponent implements OnChanges {
  @Input() service!: Service;
  protected status: "ok" | "degraded" | "serious" | "unknown" = "unknown";

  ngOnChanges(): void {
    if (this.service) {
      if (this.service.avgLatency <= 200) {
        this.status = "ok";
      } else if (this.service.avgLatency > 200 && this.service.avgLatency <= 500) {
        this.status = "degraded";
      } else {
        this.status = "serious";
      }
    } else {
      this.status = "unknown";
    }
  }

}
