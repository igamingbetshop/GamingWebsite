import {Component, Injector} from "@angular/core";
import {
    BaseCreateDynamicComponent
} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileDepositType19DefaultComponent} from "./deposit-type19-default/mobile-deposit-type19-default.component";

@Component({
    selector: 'app-mobile-deposit-type19',
    template: `<template #loadChildComponent></template>`
})

export class MobileDepositType19Component extends BaseCreateDynamicComponent {
    constructor(public injector: Injector) {
        super(injector);

    }

    ngOnInit() {
        super.ngOnInit();
    }

    createSubComponent(Id: number, ContentType: number, info: number[], maxMinAmount?: any) {
        super.createSubComponent(Id, ContentType, info, maxMinAmount);
        switch (Id) {
            default: {
                this.componentRef = this.entry.createComponent(MobileDepositType19DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
        }
    }
}