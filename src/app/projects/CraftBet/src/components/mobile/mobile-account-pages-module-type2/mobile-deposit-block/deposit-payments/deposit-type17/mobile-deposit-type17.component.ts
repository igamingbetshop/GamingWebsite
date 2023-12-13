import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileDepositType17DefaultComponent} from "./deposit-type17-default/mobile-deposit-type17-default.component";


@Component({
  selector: 'app-mobile-deposit-type17',
  template: `<template #loadChildComponent></template>`
})
export class MobileDepositType17Component extends BaseCreateDynamicComponent implements OnInit{

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
        this.componentRef = this.entry.createComponent(MobileDepositType17DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
