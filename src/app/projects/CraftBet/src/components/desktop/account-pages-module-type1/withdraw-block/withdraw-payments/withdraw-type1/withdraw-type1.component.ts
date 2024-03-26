import {Component, Injector } from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType1DefaultComponent} from "./withdraw-type1-default/withdraw-type1-default.component";

@Component({
  selector: 'app-withdraw-type1',
  template: `<template #loadChildComponent></template>`
})
export class WithdrawType1Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(WithdrawType1DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
    }
  }

}
