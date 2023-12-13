import {Component, Injector} from '@angular/core';
import {CommonParentCasinoComponent} from '../../common/common-parent-casino/common-parent-casino.component';

@Component({
  selector: 'app-parent-casino',
  templateUrl: './parent-casino.component.html',
  styleUrls: ['./parent-casino.component.scss']
})
export class ParentCasinoComponent extends CommonParentCasinoComponent {

  constructor(public injector: Injector)
  {
    super(injector);
  }

}
