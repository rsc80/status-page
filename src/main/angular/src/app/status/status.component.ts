import { Component } from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [UiLibraryAngularModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

}
