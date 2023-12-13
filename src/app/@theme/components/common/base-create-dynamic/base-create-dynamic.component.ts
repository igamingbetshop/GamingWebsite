import {
    ViewChild,
    ViewContainerRef,
    Injector,
    OnInit,
    Input, OnDestroy, Directive
} from '@angular/core';

@Directive()
export class BaseCreateDynamicComponent implements OnInit, OnDestroy {

    @Input() paymentSystemId: number;
    @Input() contentType: number;
    @Input() nominals: number[];
    @Input() CommissionPercent: number;
    @Input() maxMinAmount: any;
    @Input() walletAddress: string;
    @Input() destinationTag: string;

    componentRef: any;
    @ViewChild('loadChildComponent', {read: ViewContainerRef, static: true}) entry: ViewContainerRef;

    constructor(public injector: Injector) {

    }

    ngOnInit() {
        this.createSubComponent(this.paymentSystemId, this.contentType, this.nominals,this.maxMinAmount,  this.CommissionPercent);
    }

    createSubComponent(Id: number, ContentType: number, info?: number[], maxMinAmount?: any, CommissionPercent: Number = 0) {
        if(this.entry)
            this.entry.clear();
    }

    ngOnDestroy() {}
}
