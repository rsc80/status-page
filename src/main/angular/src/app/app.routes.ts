import { Routes } from '@angular/router';
import {StatusComponent} from "./status/status.component";
import {EventsComponent} from "./events/events.component";

export const routes: Routes = [
  {
    path: "status",
    component: StatusComponent
  },
  {
    path: "events",
    component: EventsComponent
  },
  {
    path: "**",
    redirectTo: "status"
  }
];
