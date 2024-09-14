import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Participant} from "../model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  getStatus(id: string): Observable<Participant> {
    return this.httpClient.get<Participant>(`/api/participants/${id}`);
  }

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`/api/participants-overview`);
  }

}
