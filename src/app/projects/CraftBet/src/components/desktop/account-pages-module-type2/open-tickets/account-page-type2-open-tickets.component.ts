import {Component, Injector } from '@angular/core';
import {AppCommonOpenTicketComponent} from "../../../common/app-common-open-ticket/app-common-open-ticket.component";
import {SharedService} from "@core/services";

@Component({
  selector: 'app-account-page-type2-open-tickets',
  templateUrl: './account-page-type2-open-tickets.component.html'
})
export class AccountPageType2OpenTicketsComponent extends AppCommonOpenTicketComponent {
  public rightToLeftOrientation: boolean = false;
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
