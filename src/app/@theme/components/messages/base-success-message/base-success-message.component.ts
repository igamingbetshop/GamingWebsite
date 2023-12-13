import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-base-success-message',
    templateUrl: './base-success-message.component.html',
    styleUrls: ['./base-success-message.component.scss']
})
export class BaseSuccessMessageComponent implements OnInit {

    @Input() infoText: any;

    constructor() {
    }

    ngOnInit() {
    }

}
