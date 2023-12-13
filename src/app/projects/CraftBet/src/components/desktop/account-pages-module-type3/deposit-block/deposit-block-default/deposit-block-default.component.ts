import { Component, Injector } from '@angular/core';
import { BaseDepositComponent } from '../../../../../../../../@theme/components/common/base-deposit/base-deposit.component';
import { DepositType1Component } from '../deposit-payments/deposit-type1/deposit-type1.component';
import { DepositType2Component } from '../deposit-payments/deposit-type2/deposit-type2.component';
import { DepositType3Component } from '../deposit-payments/deposit-type3/deposit-type3.component';
import { DepositType4Component } from '../deposit-payments/deposit-type4/deposit-type4.component';
import { DepositType5Component } from '../deposit-payments/deposit-type5/deposit-type5.component';
import { DepositType6Component } from '../deposit-payments/deposit-type6/deposit-type6.component';
import { DepositType7Component } from '../deposit-payments/deposit-type7/deposit-type7.component';
import { DepositType8Component } from '../deposit-payments/deposit-type8/deposit-type8.component';
import { DepositType9Component } from '../deposit-payments/deposit-type9/deposit-type9.component';
import { DepositType10Component } from '../deposit-payments/deposit-type10/deposit-type10.component';
import { DepositType11Component } from '../deposit-payments/deposit-type11/deposit-type11.component';
import { DepositType13Component } from '../deposit-payments/deposit-type13/deposit-type13.component';
import { DepositType14Component } from '../deposit-payments/deposit-type14/deposit-type14.component';
import { DepositType15Component } from '../deposit-payments/deposit-type15/deposit-type15.component';
import { DepositType16Component } from '../deposit-payments/deposit-type16/deposit-type16.component';

import { TranslateService } from '@ngx-translate/core';
import { GetPaymentsService } from '../../../../../../../../@core/services/app/getPayments.service';
import { LocalStorageService, SaveData } from '../../../../../../../../@core/services';
import { BaseApiService } from '../../../../../../../../@core/services/api/base-api.service';
import { SimpleModalService } from 'ngx-simple-modal';
import {DepositType18Component} from "../deposit-payments/deposit-type18/deposit-type18.component";
import {Controllers, Methods} from "../../../../../../../../@core/enums";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-deposit-block-default',
    templateUrl: './deposit-block-default.component.html',
    styleUrls: ['./deposit-block-default.component.scss']
})
export class DepositBlockDefaultComponent extends BaseDepositComponent {
    public translate: TranslateService;
    public getPaymentsService: GetPaymentsService;
    public savedDateService: SaveData;
    public localStorageService: LocalStorageService;
    public baseApiService: BaseApiService;
    public simpleModalService: SimpleModalService;
    public bankTransferValue = false;
    messageKey;
    public banks = [];
    public userData;
    public depositLimit;

    constructor(public injector: Injector) {
        super(injector);
        this.translate = injector.get(TranslateService);
        this.getPaymentsService = injector.get(GetPaymentsService);
        this.savedDateService = injector.get(SaveData);
        this.localStorageService = injector.get(LocalStorageService);
        this.userData = this.localStorageService.get('user');
        this.baseApiService = injector.get(BaseApiService);
        this.simpleModalService = injector.get(SimpleModalService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_DEPOSIT_LIMITS).pipe(take(1)).subscribe((data) => {
            this.depositLimit = data.ResponseObject;
            this.translate.get('User.Deposit-Self-Limitation').subscribe((res: string) => {
                let currentValue = null;
                if (this.depositLimit.DailyDepositLimitAmountLeft != null && this.depositLimit.MonthlyDepositLimitAmountLeft != null && this.depositLimit.WeeklyDepositLimitAmountLeft != null) {
                    currentValue = Math.min(this.depositLimit.DailyDepositLimitAmountLeft, this.depositLimit.MonthlyDepositLimitAmountLeft, this.depositLimit.WeeklyDepositLimitAmountLeft);
                } else {
                    const non_null_limits = [this.depositLimit.DailyDepositLimitAmountLeft, this.depositLimit.MonthlyDepositLimitAmountLeft, this.depositLimit.WeeklyDepositLimitAmountLeft].filter(Boolean);
                    if (non_null_limits.length > 0) {
                        currentValue = Math.min(...non_null_limits);
                    } else {
                        currentValue = 0;
                    }
                }
                const smallestLimitString = currentValue.toString();
                this.messageKey = res.replace('value', smallestLimitString);
            });
        });
    }

    selectPayment(paymentData, changeUrl: boolean = true)
    {
        let data;
        if(paymentData.PaymentSystemId === 206)
        {
             data = this.onPageLoad();
        }
        super.selectPayment(paymentData, false, data);
    }

    onPageLoad():string {
        const f = this.generateUUID();
        const s = "paypal-buyer@bet3000.com";
        const sandbox = true;
        this.createOrUpdateParamsScriptTag(f, s, sandbox);
        this.loadOrReloadPaypalScript();
        return f;
    }

    generateUUID() {
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    createOrUpdateParamsScriptTag(_f, _s, _sandbox) {
        const fncls = "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99";
        const existingScriptElement = document.querySelector(`[fncls="${fncls}"]`);
        const jsonData = {
            f: _f,
            s: _s,
            sandbox: _sandbox,
        };

        if (existingScriptElement) {

            existingScriptElement.textContent = JSON.stringify(jsonData);
        } else {
            const jsonData = {
                f: _f,
                s: _s,
                sandbox: false,
            };
            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('type', 'application/json');
            scriptElement.setAttribute('fncls', fncls);
            scriptElement.textContent = JSON.stringify(jsonData);
            document.body.appendChild(scriptElement);
        }
    }

    loadOrReloadPaypalScript() {
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = 'https://c.paypal.com/da/r/fb.js';
        const existingScript = document.querySelector('script[src="https://c.paypal.com/da/r/fb.js"]');
        if (existingScript) {
            existingScript.remove();
        }
        document.body.appendChild(scriptElement);
    }



    async redirectToSelfLimitation() {
        const { AccountPageType3DefaultComponent } = await import('../../default/account-page-type3-default.component');
        this.simpleModalService.removeAll().then();
       setTimeout(() => {
           this.simpleModalService.addModal(AccountPageType3DefaultComponent,
               {title: 'self-limitation'}, {closeOnClickOutside: true}).subscribe(() => {
           });
           this.savedDateService.selectedItem.Href = 'self-limitation';
       }, 100);
    }

    createComponent(Id: number, Type: number, ContentType: number, info?: number[], maxMinAmount?: any, data?: any) {
        super.createComponent(Id, Type, ContentType, info, maxMinAmount, data);
        switch (Type) {
            case 1: {
                this.componentRef = this.entry.createComponent(DepositType1Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 2: {
                this.componentRef = this.entry.createComponent(DepositType2Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                this.componentRef.instance.data = data;
                break;
            }

            case 3: {
                this.componentRef = this.entry.createComponent(DepositType3Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 4: {
                this.componentRef = this.entry.createComponent(DepositType4Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 5: {
                this.componentRef = this.entry.createComponent(DepositType5Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 6: {
                this.componentRef = this.entry.createComponent(DepositType6Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 7: {
                this.componentRef = this.entry.createComponent(DepositType7Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 8: {
                this.componentRef = this.entry.createComponent(DepositType8Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 9: {
                this.componentRef = this.entry.createComponent(DepositType9Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 10: {
                this.componentRef = this.entry.createComponent(DepositType10Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 11: {
                this.componentRef = this.entry.createComponent(DepositType11Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 13: {
                this.componentRef = this.entry.createComponent(DepositType13Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 14: {
                this.componentRef = this.entry.createComponent(DepositType14Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 15: {
                this.componentRef = this.entry.createComponent(DepositType15Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 16: {
                this.componentRef = this.entry.createComponent(DepositType16Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 18: {
                this.componentRef = this.entry.createComponent(DepositType18Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

        }
    }
}
