import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DatePipe, NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {StatusItem} from "../model";
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

@Component({
  selector: 'app-status-bubble',
  standalone: true,
  imports: [
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgClass,
    UiLibraryAngularModule,
    DatePipe
  ],
  templateUrl: './status-bubble.component.html',
  styleUrl: './status-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBubbleComponent {
  @Input() statusItem!: StatusItem;
}
