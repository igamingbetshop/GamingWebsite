import {Component, Injector } from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {DepositType4DefaultComponent} from "../deposit-type4/deposit-type4-default/deposit-type4-default.component";

@Component({
  selector: 'app-deposit-type4',
  template: `<template #loadChildComponent></template>`
})
export class DepositType4Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number) {
    super.createSubComponent(Id, ContentType);

    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(DepositType4DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }
    }
  }
}
