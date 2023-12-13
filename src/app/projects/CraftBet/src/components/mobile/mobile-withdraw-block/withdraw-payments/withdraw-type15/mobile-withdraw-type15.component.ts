import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileWithdrawType15DefaultComponent} from "./withdraw-type15-default/mobile-withdraw-type15-default.component";

@Component({
  selector: 'app-mobile-withdraw-type15',
  template: `<template #loadChildComponent></template>`
})
export class MobileWithdrawType15Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(MobileWithdrawType15DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
