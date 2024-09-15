import {Component, Input} from '@angular/core';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {NgIf} from "@angular/common";
import {StatusLine} from "../../model";

@Component({
  selector: 'app-status-line',
  standalone: true,
  imports: [
    UiLibraryAngularModule,
    NgIf
  ],
  templateUrl: './status-line.component.html',
  styleUrl: './status-line.component.scss'
})
export class StatusLineComponent {

  @Input()
  statusLine!: StatusLine;
  @Input()
  participantName!: string;

}
