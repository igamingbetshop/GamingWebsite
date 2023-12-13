import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileDepositType16DefaultComponent} from "./deposit-type16-default/mobile-deposit-type16-default.component";
import {MobileDepositType15DefaultComponent} from "../deposit-type15/deposit-type15-default/mobile-deposit-type15-default.component";

@Component({
  selector: 'app-mobile-deposit-type16',
  template: `<template #loadChildComponent></template>`
})
export class MobileDepositType16Component extends BaseCreateDynamicComponent implements OnInit{

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
        this.componentRef = this.entry.createComponent(MobileDepositType16DefaultComponent);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        break;
      }
    }
  }

}
