import {Component, Injector} from '@angular/core';
import {
  MobileWithdrawType17DefaultComponent,
} from "./withdraw-type17-default/mobile-withdraw-type17-default.component";
import {BaseCreateDynamicComponent} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";

@Component({
  selector: 'app-mobile-withdraw-type17',
  template: `<template #loadChildComponent></template>`
})
export class MobileWithdrawType17Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(MobileWithdrawType17DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
