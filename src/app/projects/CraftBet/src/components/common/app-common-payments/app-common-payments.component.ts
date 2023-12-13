import {Injectable, Injector} from '@angular/core';
import {BasePaymentsComponent} from '../../../../../../@theme/components/common/base-payments/base-payments.component';

@Injectable()
export class AppCommonPaymentsComponent extends BasePaymentsComponent {

  public settings = {
    bigBanner: true,
    format: 'yyyy-MM-dd hh:mm',
    defaultOpen: false,
    timePicker: true,
    closeOnSelect: true
  };

  public showCalendar: boolean;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
