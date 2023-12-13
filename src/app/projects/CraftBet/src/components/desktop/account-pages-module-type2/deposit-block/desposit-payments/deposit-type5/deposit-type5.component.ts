import {Component, Injector } from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {DepositType5DefaultComponent} from '../deposit-type5/deposit-type5-default/deposit-type5-default.component';

@Component({
  selector: 'app-deposit-type5',
  template: `<template #loadChildComponent></template>`
})
export class DepositType5Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(DepositType5DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }
    }
  }

}
