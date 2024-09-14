import {Inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Participant, StatusItem} from "../model";
import {HttpClient} from "@angular/common/http";

const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  getStatus(id: string): Observable<StatusItem> {
    return of({id, status: "SUCCESS", rangeStart: new Date()});
  }

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`${BASE_URL}/api/participants-overview`);
  }

}
