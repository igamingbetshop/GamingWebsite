import { Component, Injector } from '@angular/core';
import {AppCommonOpenTicketComponent} from '../../common/app-common-open-ticket/app-common-open-ticket.component';
import {SharedService} from "@core/services";

@Component({
  selector: 'app-app-open-ticket',
  templateUrl: './app-open-ticket.component.html',
  styleUrls: ['./app-open-ticket.component.scss']
})
export class AppOpenTicketComponent extends AppCommonOpenTicketComponent {
  public rightToLeftOrientation: boolean = false;
  constructor(public injector: Injector, public sharedService: SharedService) {
    super(injector);
  }
  ngOnInit()
  {
    super.ngOnInit();
    this.sharedService.rightToLeftOrientation.subscribe((recponceData) => {
      this.rightToLeftOrientation = recponceData;
    });
  }
}
