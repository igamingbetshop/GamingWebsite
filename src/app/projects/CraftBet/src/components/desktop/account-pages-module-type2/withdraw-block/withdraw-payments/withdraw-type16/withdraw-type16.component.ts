import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType16DefaultComponent} from "./withdraw-type16-default/withdraw-type16-default.component";
import {WithdrawType8DefaultComponent} from "../withdraw-type8/withdraw-type8-default/withdraw-type8-default.component";

@Component({
  selector: 'app-withdraw-type16',
  template: `<template #loadChildComponent></template>`
})
export class WithdrawType16Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(WithdrawType16DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
    }
  }

}