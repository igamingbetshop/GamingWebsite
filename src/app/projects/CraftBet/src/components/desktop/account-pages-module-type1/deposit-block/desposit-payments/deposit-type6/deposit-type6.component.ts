import {Component, Injector } from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {DepositType6DefaultComponent} from "../deposit-type6/deposit-type6-default/deposit-type6-default.component";

@Component({
  selector: 'app-deposit-type6',
  template: `<template #loadChildComponent></template>`
})
export class DepositType6Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number, info:number[], maxMinAmount?: any) {
    super.createSubComponent(Id, ContentType, info, maxMinAmount);

    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(DepositType6DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
    }
  }
}
