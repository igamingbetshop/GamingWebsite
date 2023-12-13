import {Component, Injector } from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType12DefaultComponent} from "./withdraw-type12-default/withdraw-type12-default.component";

@Component({
  selector: 'app-withdraw-type12',
  template: `<template #loadChildComponent></template>`
})
export class WithdrawType12Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number, info:number[], CommissionPercent: number) {
    super.createSubComponent(Id, ContentType, info, CommissionPercent);
    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(WithdrawType12DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.CommissionPercent = CommissionPercent;
        break;
      }
    }
  }

}
