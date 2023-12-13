import {Component, Injector} from '@angular/core';
import {BaseFriendsComponent} from "../../../../../../../@theme/components/common/base-friends/base-friends.component";

@Component({
  selector: 'app-mobile-account-page-type1-friends',
  templateUrl: './mobile-account-page-type1-friends.component.html',
})
export class MobileAccountPageType1FriendsComponent extends BaseFriendsComponent {

  constructor(protected injector: Injector) {
    super(injector);
  }

}
