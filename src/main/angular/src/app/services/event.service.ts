import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Event} from "../events/events.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('/api/events');
  }

  getEvent(id: string): Observable<Event> {
    return this.httpClient.get<Event>(`api/events/${id}`);
  }
}
