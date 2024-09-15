import {Component} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

@Component({
  selector: 'app-incident-history',
  standalone: true,
  imports: [
    UiLibraryAngularModule
  ],
  templateUrl: './incident-history.component.html',
  styleUrl: './incident-history.component.scss'
})
export class IncidentHistoryComponent {
  // fetch data from backend

}
