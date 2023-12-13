import { Component, Injector } from '@angular/core';
import { SharedService } from '@core/services';
import { AppCommonOpenTicketComponent } from '../../../common/app-common-open-ticket/app-common-open-ticket.component';

@Component({
  selector: 'app-account-page-type3-open-tickets',
  templateUrl: './account-page-type3-open-tickets.component.html',
  styleUrls: ['./account-page-type3-open-tickets.component.scss']
})
export class AccountPageType3OpenTicketsComponent extends AppCommonOpenTicketComponent {
  public rightToLeftOrientation = false;
  constructor(public injector: Injector, public sharedService: SharedService) {
    super(injector);
  }

  ngOnInit() {

    super.ngOnInit();
    this.sharedService.rightToLeftOrientation.subscribe((recponceData) => {
      this.rightToLeftOrientation = recponceData;
    });
  }

}
