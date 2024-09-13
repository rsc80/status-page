import {Component} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    UiLibraryAngularModule,
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events: Event[] = [
    {
      id: "1",
      name: "Oracle Patch",
      type: "Maintenance",
      status: "Scheduled",
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: "2",
      name: "Slow NWP API Calls",
      type: "Incident",
      status: "Ongoing",
      endDate: new Date(),
      startDate: new Date(),
    }
  ];
}

export interface Event {
  id: string;
  name: string;
  type: "Maintenance" | "Incident";
  status: "Scheduled" | "Ongoing" | "Done";
  startDate: Date;
  endDate: Date;
}
