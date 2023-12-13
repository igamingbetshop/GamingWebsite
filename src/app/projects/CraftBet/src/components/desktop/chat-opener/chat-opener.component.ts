import {Component} from '@angular/core';
import {StateService} from "../../../../../../@core/services/app/state.service";

@Component({
  selector: 'chant-opener',
  templateUrl: './chat-opener.component.html',
  styleUrls: ['./chat-opener.component.scss']
})
export class ChatOpenerComponent
{
    constructor(public stateService:StateService)
    {

    }
}
