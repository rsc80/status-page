import {Inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Participant, StatusItem} from "../model";
import {HttpClient} from "@angular/common/http";

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
    return this.httpClient.get<Participant[]>("participants-response.mock.json");
  }

}
