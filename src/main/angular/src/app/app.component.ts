import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusComponent} from "./status/status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiLibraryAngularModule, StatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'status-page';
}
