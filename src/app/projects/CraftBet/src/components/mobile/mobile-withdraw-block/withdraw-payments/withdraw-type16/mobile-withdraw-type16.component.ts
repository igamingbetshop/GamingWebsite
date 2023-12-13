import {Component, Injector} from '@angular/core';
import {MobileWithdrawType16DefaultComponent} from "./withdraw-type16-default/mobile-withdraw-type16-default.component";
import {BaseCreateDynamicComponent} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";

@Component({
  selector: 'app-mobile-withdraw-type16',
  template: `<template #loadChildComponent></template>`
})
export class MobileWithdrawType16Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(MobileWithdrawType16DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
