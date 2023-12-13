import {Component, Injector, ViewEncapsulation} from '@angular/core';
import {CommonGetTextComponent} from "../../common/common-get-text/common-get-text.component";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class InformationComponent extends CommonGetTextComponent
{
  name:string;
  constructor(public injector: Injector)
  {
    super(injector);
  }


}
