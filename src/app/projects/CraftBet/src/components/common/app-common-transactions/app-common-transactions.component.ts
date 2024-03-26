import {Directive, Injector} from '@angular/core';
import {BaseTransactionsComponent} from '../../../../../../@theme/components/common/base-transactions/base-transactions.component';


@Directive()
export class AppCommonTransactionsComponent extends BaseTransactionsComponent {

  public settings = {
    bigBanner: true,
    format: 'yyyy-MM-dd hh:mm',
    defaultOpen: false,
    timePicker: true,
    closeOnSelect: true
  };

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
