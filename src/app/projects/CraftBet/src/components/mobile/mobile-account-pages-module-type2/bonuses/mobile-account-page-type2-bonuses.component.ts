import {Component, Injector} from '@angular/core';
import {BonusesComponent} from "../../../../../../../@theme/components/common/bonuses/bonuses.component";
import {LayoutService} from "@core/services/app/layout.service";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-mobile-account-page-type2-bonuses',
  templateUrl: './mobile-account-page-type2-bonuses.component.html'
})
export class MobileAccountPageType2BonusesComponent extends BonusesComponent {

  public faTrashAlt = faTrashAlt;
  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

}
