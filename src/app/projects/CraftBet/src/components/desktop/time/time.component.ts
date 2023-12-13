import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseTime} from "../../../../../../@theme/components/time/base-time";
import {FormsModule} from "@angular/forms";
import {TimezoneFilterPipe} from "../../../../../../@theme/pipes/timezone-filter.pipe";

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, FormsModule, TimezoneFilterPipe],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class TimeComponent extends BaseTime implements OnInit {

}
