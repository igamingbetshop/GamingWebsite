import {
  Component,
  Injector
} from '@angular/core';

import {BaseCreateDynamicComponent} from '../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component';
import {DepositType1DefaultComponent} from '../deposit-type1/deposit-type1-default/deposit-type1-default.component';

@Component({
  selector: 'app-deposit-type1',
  template: `<template #loadChildComponent></template>`
})
export class DepositType1Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType:number) {
    super.createSubComponent(Id, ContentType);

    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(DepositType1DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }
    }
  }

}
