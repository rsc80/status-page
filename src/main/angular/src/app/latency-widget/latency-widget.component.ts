import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {Service} from "../model";

@Component({
  selector: 'app-latency-widget',
  standalone: true,
  imports: [
    NgIf,
    UiLibraryAngularModule
  ],
  templateUrl: './latency-widget.component.html',
  styleUrl: './latency-widget.component.scss'
})
export class LatencyWidgetComponent {
  
  @Input() service!: Service;

}
