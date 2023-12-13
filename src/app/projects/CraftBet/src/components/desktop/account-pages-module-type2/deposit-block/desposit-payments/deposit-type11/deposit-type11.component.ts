import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {DepositType11DefaultComponent} from '../deposit-type11/deposit-type11-default/deposit-type11-default.component';

@Component({
  selector: 'app-deposit-type11',
  template: `<template #loadChildComponent></template>`
})
export class DepositType11Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType:number, info:number[]) {
    super.createSubComponent(Id, ContentType, info);

    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(DepositType11DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }
}
