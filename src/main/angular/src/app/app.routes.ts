import { Routes } from '@angular/router';
import {StatusComponent} from "./status/status.component";
import {EventsComponent} from "./events/events.component";
import {EventComponent} from "./event/event.component";

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
    path: "events/:id",
    component: EventComponent
  },
  {
    path: "**",
    redirectTo: "status"
  }
];
