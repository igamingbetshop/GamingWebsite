import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileDepositType1DefaultComponent} from "./deposit-type1-default/mobile-deposit-type1-default.component";

@Component({
  selector: 'app-mobile-deposit-type1',
  template: `<template #loadChildComponent></template>`
})
export class MobileDepositType1Component extends BaseCreateDynamicComponent {

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
        this.componentRef = this.entry.createComponent(MobileDepositType1DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }
    }
  }

}
