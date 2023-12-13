import {Component, Injector} from '@angular/core';
import {BaseFriendsComponent} from "../../../../../../../@theme/components/common/base-friends/base-friends.component";

@Component({
  selector: 'app-mobile-account-page-type2-friends',
  templateUrl: './mobile-account-page-type2-friends.component.html'
})
export class MobileAccountPageType2FriendsComponent extends BaseFriendsComponent {

  constructor(protected injector: Injector) {
    super(injector);
  }

}
