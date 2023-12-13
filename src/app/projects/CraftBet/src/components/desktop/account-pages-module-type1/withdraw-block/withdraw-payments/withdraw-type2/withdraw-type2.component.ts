import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from '../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component';
import {WithdrawType2DefaultComponent} from './withdraw-type2-default/withdraw-type2-default.component';
import {WithdrawType3DefaultComponent} from "../withdraw-type3/withdraw-type3-default/withdraw-type3-default.component";

@Component({
  selector: 'app-withdraw-type2',
  template: `<template #loadChildComponent></template>`
})
export class WithdrawType2Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(WithdrawType2DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
    }
  }

}
