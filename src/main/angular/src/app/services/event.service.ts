import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Event} from "../model";

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
