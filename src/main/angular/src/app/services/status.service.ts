import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Participant, ParticipantStatusDetails} from "../model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  getStatus(id: string, day: string): Observable<ParticipantStatusDetails> {
    return this.httpClient.get<ParticipantStatusDetails>(`/api/participants/${id}/${day}`);
  }

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`/api/participants-overview`);
  }

}
