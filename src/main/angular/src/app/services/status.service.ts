import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DailyData, Participant} from "../model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  getStatus(id: string, day: string): Observable<DailyData> {
    return this.httpClient.get<DailyData>(`/api/participants/${id}/${day}`);
  }

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`/api/participants-overview`);
  }

}
