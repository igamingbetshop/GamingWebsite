import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileDepositType4DefaultComponent} from "./deposit-type4-default/mobile-deposit-type4-default.component";

@Component({
  selector: 'app-mobile-deposit-type4',
  template: `<template #loadChildComponent></template>`
})
export class MobileDepositType4Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(MobileDepositType4DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }
    }
  }

}
