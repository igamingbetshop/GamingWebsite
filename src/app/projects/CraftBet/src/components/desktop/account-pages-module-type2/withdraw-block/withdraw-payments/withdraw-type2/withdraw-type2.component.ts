import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from '../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component';
import {WithdrawType2DefaultComponent} from './withdraw-type2-default/withdraw-type2-default.component';

import {GetPaymentsService} from "@core/services/app/getPayments.service";

@Component({
  selector: 'app-withdraw-type2',
  template: `<template #loadChildComponent></template>`
})
export class WithdrawType2Component extends BaseCreateDynamicComponent {
  public getPaymentsService: GetPaymentsService;

  constructor(public injector: Injector) {
    super(injector);
    this.getPaymentsService = injector.get(GetPaymentsService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number, info:number[], CommissionPercent: number) {
    super.createSubComponent(Id, ContentType, info, CommissionPercent);
    this.getPaymentsService.getClientPaymentMethods(Id);
    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(WithdrawType2DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.CommissionPercent = CommissionPercent;
        break;
      }
    }
  }

}
