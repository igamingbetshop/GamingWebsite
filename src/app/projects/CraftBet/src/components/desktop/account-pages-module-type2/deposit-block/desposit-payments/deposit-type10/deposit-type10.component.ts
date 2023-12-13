import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {DepositType10DefaultComponent} from "./deposit-type10-default/deposit-type10-default.component";


@Component({
  selector: 'app-deposit-type10',
  template: `<template #loadChildComponent></template>`
})
export class DepositType10Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(DepositType10DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
