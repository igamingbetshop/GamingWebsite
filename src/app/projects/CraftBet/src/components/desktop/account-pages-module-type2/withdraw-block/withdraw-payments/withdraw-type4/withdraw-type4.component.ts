import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType4DefaultComponent} from './withdraw-type4-default/withdraw-type4-default.component';

@Component({
  selector: 'app-withdraw-type4',
  template: `<template #loadChildComponent></template>`
})
export class WithdrawType4Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number, info:number[], CommissionPercent) {
    super.createSubComponent(Id, ContentType, info, CommissionPercent);
    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(WithdrawType4DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.CommissionPercent = CommissionPercent;
        break;
      }
    }
  }

}
