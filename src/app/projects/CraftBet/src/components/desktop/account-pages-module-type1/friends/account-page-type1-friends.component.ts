import {Component, Injector} from '@angular/core';
import {BaseFriendsComponent} from "../../../../../../../@theme/components/common/base-friends/base-friends.component";

@Component({
  selector: 'app-account-page-type1-friends',
  templateUrl: './account-page-type1-friends.component.html'
})
export class AccountPageType1FriendsComponent extends BaseFriendsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
