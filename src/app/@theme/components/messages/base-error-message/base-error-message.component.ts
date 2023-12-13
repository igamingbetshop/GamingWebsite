import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-base-error-message',
  templateUrl: './base-error-message.component.html',
  styleUrls: ['./base-error-message.component.scss']
})
export class BaseErrorMessageComponent implements OnInit {

  @Input() infoText: any;

  constructor() { }

  ngOnInit() {
  }

}
