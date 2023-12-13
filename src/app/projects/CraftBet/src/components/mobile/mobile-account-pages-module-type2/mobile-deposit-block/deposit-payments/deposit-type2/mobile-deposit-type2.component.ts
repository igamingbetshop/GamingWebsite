import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";

@Component({
  selector: 'app-mobile-deposit-type2',
  template: `<template #loadChildComponent></template>`
})
export class MobileDepositType2Component extends BaseCreateDynamicComponent {

  constructor(public injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
