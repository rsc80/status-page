import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {StatusComponent} from "./status/status.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiLibraryAngularModule, StatusComponent, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'status-page';
}
