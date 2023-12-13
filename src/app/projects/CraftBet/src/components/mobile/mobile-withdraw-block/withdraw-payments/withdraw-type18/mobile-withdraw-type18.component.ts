import {Component, Injector} from '@angular/core';
import {MobileWithdrawType18DefaultComponent} from "./withdraw-type18-default/mobile-withdraw-type18-default.component";
import {BaseCreateDynamicComponent} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";

@Component({
  selector: 'app-mobile-withdraw-type18',
  template: `<template #loadChildComponent></template>`
})
export class MobileWithdrawType18Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createSubComponent(Id: number, ContentType: number, info: number[]) {
    super.createSubComponent(Id, ContentType, info);
    switch (Id) {
      default: {
        this.componentRef = this.entry.createComponent(MobileWithdrawType18DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
