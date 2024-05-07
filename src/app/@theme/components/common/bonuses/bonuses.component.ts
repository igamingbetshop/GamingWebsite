import {Directive, inject, Injector} from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {BonusesService} from "@core/services/api/bonuses.service";
import {Bonus, BonusBet} from "@core/models";
import {Controllers, MenuType, Methods, Products} from "@core/enums";
import {TranslateService} from "@ngx-translate/core";
import {GetBetsHistoryService} from "@core/services/app/getBetsHistory.service";
import {BaseQuestionTabComponent} from "../../modals/base-question-tab/base-question-tab.component";
import {BaseTriggersComponent} from "../base-triggers/base-triggers.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseApiService} from "@core/services/api/base-api.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {UtilityService} from "@core/services/app/utility.service";
import {Subject} from "rxjs";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class BonusesComponent extends BaseComponent {

    public userInfo: any;
    public userLogined: UserLogined;
    public bonusesService: BonusesService;
    public getBetsHistoryService: GetBetsHistoryService;
    private baseControllerService:BaseControllerService;
    private translateService: TranslateService;
    private utilService: UtilityService;
    dialog = inject(MatDialog);
    public baseApiService: BaseApiService;
    public utilityService: UtilityService;
    public translate: TranslateService;
    private datePipe: DatePipe;

    public bonuses: Array<Bonus> = [];

    public bonusesData:{headers:string[],body:any[]} = {headers:[],body:[]};

    public bonusBets: Array<BonusBet> = [];
    public selectedProduct: number;
    public selectedTab: any;
    public selectedBonusIndex: number = 0;
    public page: number = 1;
    public sportPage: number = 1;

    public availableTypes = [4, 6, 7, 9, 10, 13];
    public campaignTypes = [10, 11, 12, 13, 14];
    public noHistory;
    tabs:any[] = [];

    promoCode: string;
    promoCodeSuccessMessage: string;
    promoCodeErrorMessage: string;
    activatePromoCodeResponse$ = new Subject<{ message: string; type: string }>();
    products = Products;

    public form: FormGroup;
    public fb: FormBuilder;

    public statusList: Array<any> = [];
    public filterChanged = false;

    constructor(public injector: Injector)
    {
        super(injector);
        this.bonusesService = injector.get(BonusesService);
        this.getBetsHistoryService = injector.get(GetBetsHistoryService);
        this.translateService = injector.get(TranslateService);
        this.utilService = injector.get(UtilityService);
        this.fb = injector.get(FormBuilder);
        this.baseApiService = injector.get(BaseApiService);
        this.baseControllerService = injector.get(BaseControllerService);
        this.userLogined = injector.get(UserLogined);
        this.utilityService = injector.get(UtilityService);
        this.translate = injector.get(TranslateService);
        this.form = this.fb.group({
            status: ['', [Validators.required]],
        });
        this.datePipe = injector.get(DatePipe);

        this.baseApiService.apiRequest({}, Controllers.MAIN, Methods.GET_BONUS_STATUS_ENUM, false).subscribe((responseData) => {
            if (responseData.ResponseCode == 0)
            {
                this.statusList = responseData['ResponseObject'];
            }
        });

    }

    ngOnInit() {
        super.ngOnInit();

        this.userInfo = this.userLogined.getUserInfo();

        this.subscriptions.push(this.bonusesService.notifyDeleteBonus.subscribe(data => {
            let index = this.bonuses.findIndex(item => item.Id == data.Id);
            if (index > -1)
                this.bonuses[index].State = data.State;
        }));

        this.subscriptions.push(this.bonusesService.notifyGetBonuses.subscribe((data) =>
        {
            if(data)
            {
                this.bonusesData = {headers:[],body:[]};
                const decimalPipe = new DecimalPipe('en');
                const excludedHeaders = ['StatusId','TypeId',"BonusId","ReuseNumber"];
                for(let i = 0; i < data.length; i++)
                {
                    const item = data[i];
                    if(i === 0)
                    {
                        Object.keys(item).forEach(key =>
                        {
                            if(!excludedHeaders.includes(key))
                            {
                                this.bonusesData.headers.push(key);
                            }
                        });
                        this.bonusesData.headers.splice(0, 1);
                        this.bonusesData.headers.splice(3, 0, 'Count');
                        const indexOfTurnoverCount = this.bonusesData.headers.indexOf('TurnoverCount');
                        if (indexOfTurnoverCount !== -1) {
                            this.bonusesData.headers.splice(indexOfTurnoverCount, 1);
                        }
                    }
                    if (this.availableTypes.includes(item.TypeId))
                    {
                        item['TypeIdActive'] = true;
                    }
                    else
                    {
                        item['TypeIdActive'] = false;
                    }
                    item.IsCampaign = this.campaignTypes.includes(item.TypeId);
                    Object.keys(item).forEach(key =>
                    {
                        if(!excludedHeaders.includes(key))
                        {
                            if(key.endsWith("Time") && item[key])
                                item[key] = this.datePipe.transform(item[key].toString(), "dd/MM/yyyy HH:mm");
                        }
                    });
                    item['Amount'] =  this.userInfo.CurrencyId + " " + decimalPipe.transform(item['Amount'], '.2');
                    if (item.TypeId === 14) {
                        item['Count'] = parseFloat(item['Amount'].split(' ')[1]);
                        item['Amount'] = '';
                    }
                    item['FinalAmount'] !== null ? item['FinalAmount'] = this.userInfo.CurrencyId + " " + decimalPipe.transform(item['FinalAmount'], '.2') : null;
                    item['TurnoverAmountLeft'] !== null ? item['TurnoverAmountLeft'] = this.userInfo.CurrencyId + " " + decimalPipe.transform(item['TurnoverAmountLeft'], '.2') : null;
                    this.bonusesData.body.push(item);
                }

                if (data.length)
                    this.getBonusBets(data[0], this.selectedBonusIndex);
            }
            else this.bonusesData = {headers:[],body:[]};
        }));

        this.subscriptions.push(this.bonusesService.notifyGetBonuBets.subscribe((data) => {
            this.bonusBets = data['BetBonus'];
        }));

        this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST).then((data: any) =>
        {
            const bonusDetails = data.find((item) => item.Title == 'MyBonusesDetails');
            if(bonusDetails && bonusDetails.SubMenu)
            {
                this.tabs = bonusDetails.SubMenu.map(menu =>  {
                    menu.bonusData = JSON.parse(menu.Href);
                    return menu;
                });
                this.selectedTab = this.tabs[0];
                this.getBonus(this.selectedTab.bonusData);
            }
        });
    }

    public submit()
    {
        if (this.form.get('status').value)
        {
            const bonusData = {...this.selectedTab.bonusData, ...{Status: this.form.get('status').value}};
            this.bonusesService.GetBonuses(bonusData);
        }
        else
        {
            this.bonusesService.GetBonuses(this.selectedTab.bonusData);
        }
        this.filterChanged = false;
        if (this.bonuses.length === 0) {
            this.utilityService.showMessageWithDelay(this, [{ 'noHistory': this.translate.instant('User.No-History') }]);
        }
    }

    public selectTab(tab)
    {
        this.selectedTab = tab;
        if (this.form.get('status').value)
        {
            const bonusData = {...this.selectedTab.bonusData, ...{Status: this.form.get('status').value}};
            this.getBonus(bonusData);
        }
        else
        {
            this.getBonus(this.selectedTab.bonusData);
        }
    }

    public selectProduct(product) {
        this.selectedProduct = product;
        if (this.form.get('status').value) {
            this.getBonus(product, this.form.get('status').value);
        } else {
            this.getBonus(product);
        }
    }

    public getBonus(bonus, status?)
    {
        this.bonuses = [];
        this.bonusesService.GetBonuses(bonus);
    }


    public getBonusBets(bonus: Bonus, index?)
    {
        this.selectedBonusIndex = index;
        // this.bonusesService.GetBonusBets(bonus, this.selectedProduct);
    }

    /*TO DO MOVE LOGIC TO BONUS SERVICE*/
    getBonusInfo(bet) {
        this.getBetsHistoryService.getBetsInfo(bet).then((data) => {
        });

    }

    public openTriggers(bonus: Bonus) {
        console.log('bonus',bonus);
        this.dialog.open(BaseTriggersComponent, {data:{title: 'Triggers', bonus: bonus}});
    }

    deleteBonus(bonus, event: MouseEvent)
    {
        event.stopPropagation();

        let dialogRef = this.dialog.open(BaseQuestionTabComponent, {data:{title: 'remove-bonuse'}})
        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                const decimalPipe = new DecimalPipe('en');
                this.bonusesService.DeleteBonus(bonus, this.selectedTab.bonusData);
                this.subscriptions.push(this.bonusesService.notifyDeleteBonus.subscribe(data => {
                    console.log('notify data', data);
                    this.bonusesData.body = this.bonusesData.body.map(item => {
                        if (item.Id === data.Id) {
                            data['Amount'] = this.userInfo.CurrencyId + " " + decimalPipe.transform(data['Amount'], '.2');
                            data['FinalAmount'] = this.userInfo.CurrencyId + " " + decimalPipe.transform(data['FinalAmount'], '.2');
                            data['TurnoverAmountLeft'] = this.userInfo.CurrencyId + " " + decimalPipe.transform(data['TurnoverAmountLeft'], '.2');
                            data['CalculationTime'] = this.datePipe.transform(data.CalculationTime.toString(), 'dd/MM/yyyy HH:mm');
                            data['AwardingTime'] = this.datePipe.transform(data.AwardingTime.toString(), 'dd/MM/yyyy HH:mm');
                            data['IsCampaign'] = this.campaignTypes.includes(data.TypeId);
                            return data;
                        }
                        return item;
                    });
                }));
            }
        });
    }

    activatePromoCode() {
        this.bonusesService.ActivatePromoCode(this.promoCode).subscribe(data =>
        {
            if (data['ResponseCode'] == 0)
            {
                this.translateService.get("Account.PromoCodeSendSuccess").subscribe((res: string) => {
                    this.promoCodeSuccessMessage = res;
                    this.promoCode = '';
                    this.utilService.showMessageWithDelay(this, [{'promoCodeSuccessMessage': res}, {'promoCode': this.promoCode}]);
                    this.activatePromoCodeResponse$.next({message: res, type: 'Success'});
                });
                this.bonusesService.GetBonuses(this.selectedTab.bonusData);
            } else
            {
                this.utilService.showMessageWithDelay(this, [{'promoCodeErrorMessage': data['Description']}, {'promoCode': this.promoCode}]);
                this.activatePromoCodeResponse$.next({message: data['Description'], type: 'Error'});
            }
        });
    }

}