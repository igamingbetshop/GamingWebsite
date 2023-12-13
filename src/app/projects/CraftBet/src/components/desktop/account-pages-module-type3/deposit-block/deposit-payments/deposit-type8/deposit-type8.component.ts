import {Component, Injector } from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {DepositType8DefaultComponent} from "../deposit-type8/deposit-type8-default/deposit-type8-default.component";
import {DepositType7DefaultComponent} from "../deposit-type7/deposit-type7-default/deposit-type7-default.component";

@Component({
  selector: 'app-deposit-type8',
  template: `<template #loadChildComponent></template>`
})
export class DepositType8Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(DepositType8DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
    }
  }
}
