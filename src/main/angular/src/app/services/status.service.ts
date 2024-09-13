import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {StatusItem} from "../model";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() {
  }

  getStatus(id: string): Observable<StatusItem> {
    return of({id, status: "SUCCESS"});
  }

}
