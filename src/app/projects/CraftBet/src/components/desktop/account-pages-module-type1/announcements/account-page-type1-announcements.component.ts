import {Component, Injector} from '@angular/core';
import {AppCommonAnnouncementComponent} from "../../../common/app-common-announcement/app-common-announcement.component";

@Component({
  selector: 'app-account-page-type1-announcements',
  templateUrl: './account-page-type1-announcements.component.html'
})
export class AccountPageType1AnnouncementsComponent extends AppCommonAnnouncementComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
