import {Component, Injectable, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class BaseWithdrawType6Component extends BaseWithdrawPaymentComponent {

    public partnerBetShopsList: any;
    public searchText: any = {Address: ''};
    public selectedBetShop: any;
    public selectedBetShopRegion: any;
    public amountValue: any;
    public CommissionPercent;
    public route: ActivatedRoute;

    public groupRegionId: Array<any> = [];

    constructor(public injector: Injector) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentControllerService.getPartnerBetShopList();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('CashCode', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BetShopId', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BetShopName', new FormControl('', [Validators.required]));


        this.subscriptions.push(this.paymentControllerService.notifyGetCreatePaymentData.subscribe(() => {
            this.successMessage = 'Success';
            this.paymentForm.reset();
        }));

        this.paymentControllerService.notifyGetPartnerBetShops.subscribe((responseData) => {

            this.paymentControllerService.getRegionsList();
            this.paymentControllerService.notifyGetRegionsList.subscribe((data) => {
                let betshops = responseData,
                    betshopRegions = data;

                let regions = [];
                let groupRegionByShop = [];
                betshops.map((item) => {
                    betshopRegions.map((subItem) => {
                        if (item.RegionId === subItem.Id) {
                            item['RegionName'] = subItem['Name'];
                            if (typeof (regions[item.RegionId]) === 'undefined') {
                                regions[item.RegionId] = {
                                    'Name': item['RegionName'],
                                    'Betshops': []
                                };
                                groupRegionByShop.push({
                                    'Name': item['RegionName'],
                                    'RegionId': item['RegionId'],
                                    'Betshops': []
                                });
                            }

                            regions[item.RegionId].Betshops.push(item);

                            groupRegionByShop.filter((groupedItem) => {
                                if (item['RegionId'] == groupedItem['RegionId']) {
                                    groupedItem['Betshops'].push(item);
                                }
                            });
                        }
                    });
                });

                this.groupRegionId = groupRegionByShop;
                this.partnerBetShopsList = regions;

            });
        });

        if (this.route.snapshot.data.items) {
            this.selectBetShop(this.route.snapshot.data.items[0]);
        }

    }


    public selectBetShop(betShop) {
        this.selectedBetShop = betShop;
        this.paymentForm.get('BetShopId').patchValue(betShop.Id);
        this.paymentForm.get('BetShopName').patchValue(betShop.Address);
    }

    public selectBetShopRegion(betShop) {
        this.selectedBetShopRegion = betShop;
        this.paymentForm.get('BetShopId').patchValue(betShop.RegionId);
    }

    changeBetshop(item) {}

    submit() {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        let filteredBetShopItem = this.selectedBetShopRegion ? this.selectedBetShopRegion.filter((subItem) => subItem['Id'] ==  this.paymentForm.get('BetShopId').value) : undefined;
        if(filteredBetShopItem != undefined) {
            this.paymentForm.get('BetShopName').setValue(filteredBetShopItem[0]['Address']);
        }

        requestData.PaymentSystemId = this.paymentSystemId;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('CashCode');
        this.paymentForm.removeControl('BetShopId');
        this.paymentForm.removeControl('BetShopName');
    }

}
