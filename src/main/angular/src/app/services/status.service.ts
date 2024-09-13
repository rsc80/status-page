import {Injectable} from '@angular/core';
import {Bubble} from "../status/status.component";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() {
  }

  getStatus(id: string): Observable<Bubble> {
    return of({id, status: "SUCCESS"});
  }

}
