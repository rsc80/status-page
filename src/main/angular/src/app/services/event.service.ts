import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Event} from "../events/events.component";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() {
  }

  getEvents(): Observable<Event[]> {
    return of([
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
        name: "Slow NWP API Calls that lead to significant performance impacts",
        type: "Incident",
        status: "Ongoing",
        endDate: null,
        startDate: new Date(),
      }
    ]);
  }

  getEvent(id: string): Observable<Event> {
    return of(
      {
        id: id,
        name: "Slow NWP API Calls that lead to significant performance impacts",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        type: "Maintenance",
        status: "Ongoing",
        endDate: new Date(),
        startDate: new Date(),
        affectedServices: [
          { id: "1", name: "NWP API", status: "DEGRADED" },
          { id: "2", name: "Bank API", status: "FAILURE" }
        ]
      });
  }
}
