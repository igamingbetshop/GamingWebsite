import {
  Component,
  Injector
} from '@angular/core';

import {BaseCreateDynamicComponent} from '../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component';
import {DepositType2DefaultComponent} from '../deposit-type2/deposit-type2-default/deposit-type2-default.component';

@Component({
  selector: 'app-deposit-type2',
  template: `<template #loadChildComponent></template>`
})
export class DepositType2Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number, info:number[]) {
    super.createSubComponent(Id, ContentType, info);
    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(DepositType2DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
