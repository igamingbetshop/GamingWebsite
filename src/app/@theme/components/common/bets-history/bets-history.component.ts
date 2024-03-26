import {inject, Inject, Injectable, Injector} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../../base/base.component';
import {TranslateService} from "@ngx-translate/core";
import {GetBetsHistoryService} from "@core/services/app/getBetsHistory.service";
import {Product} from "@core/models";
import {BetsService} from "@core/services/app/bets.services";
import {format} from "date-fns";
import {DOCUMENT} from "@angular/common";
import {LocalStorageService} from "@core/services";
import {ExportDataService} from "@core/services";
import * as moment from 'moment';
import {UtilityService} from "@core/services/app/utility.service";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class BetsHistoryComponent extends BaseComponent {
    @Inject(DOCUMENT) public document: Document;
    public betsService: BetsService;
    public getBetsHistoryService: GetBetsHistoryService;
    private exportDataService:ExportDataService;
    public translate: TranslateService;
    dialog = inject(MatDialog);
    public localStorageService: LocalStorageService;
    public historyInPage: number = 10;
    public page = 1;
    public noHistory;
    public total: number;
    public filterChanged = false;
    public CurrencyId: any;
    public CurrencySymbol: any;
    public utilityService: UtilityService;

    public historyTimeFilter: Array<any> = [
        {"Name": "Filter_Period.24 hours"},
        {"Name": "Filter_Period.3 days"},
        {"Name": "Filter_Period.7 days"},
        {"Name": "Filter_Period.1 month"},
        {"Name": "Filter_Period.Custom"}
    ];

    products: Product[] = [];
    public historyFilter = {
        'CreatedFrom': '',
        'CreatedBefore': '',
        'FilterIndex': 0
    };

    public historyCount: number = 0;
    public errorMessage: string;


    public defaultOption: any;
    public customFilterShow: boolean = false;
    public customButtons: boolean = false;
    public operationFilterIndex: number;
    public betStatusesCurrentValue: any;

    public form: FormGroup;
    public fb: FormBuilder;

    public date: string;
    public todate: string;

    constructor(public injector: Injector) {
        super(injector);

        this.betsService = injector.get(BetsService);
        this.exportDataService = injector.get(ExportDataService);
        this.utilityService = injector.get(UtilityService);
        this.getBetsHistoryService = injector.get(GetBetsHistoryService);
        this.localStorageService = injector.get(LocalStorageService);
        this.exportDataService = injector.get(ExportDataService);
        this.translate = injector.get(TranslateService);
        this.document = injector.get(DOCUMENT);

        this.fb = injector.get(FormBuilder);

        this.form = this.fb.group({
            timeFilter: 0,
            operationFilter: 0,
            productId: null
        });
        this.getBetsHistoryService.getBetsStatusList();

    }

    setProducts(data): void {
        this.products = data.ResponseObject;
        this.products.unshift({Id: null, Name: this.translate.instant("User.SelectProduct")});
    }

    ngOnInit() {
        super.ngOnInit();
        const userData = this.localStorageService.get('user');
        this.CurrencyId = userData ? userData.CurrencyId : '';
        this.CurrencySymbol = userData ? userData.CurrencySymbol : '';
        this.getCreationDate(this.historyTimeFilter[0]);

        this.subscriptions.push(this.getBetsHistoryService.getProducts().subscribe(data => {
            if (data.ResponseCode == 0) {
               this.setProducts(data);
            }
        }));

        if (this.getBetsHistoryService.betStatuses.length > 0) {
            this.getBetsHistory(1);

            // With Custom Dropdowns
            this.betStatusesCurrentValue = this.getBetsHistoryService.betStatuses[0];
        } else {
            let subscription = this.getBetsHistoryService.notifyGetStatusList$.subscribe((data) => {
                // With Custom Dropdowns use that variable(with current item)
                this.betStatusesCurrentValue = data[0];

                this.getBetsHistory(1);
                subscription.unsubscribe();
            });
        }

        this.form.get('timeFilter').valueChanges.subscribe((value) => {
            if (value == (this.historyTimeFilter.length - 1))
            {
                this.customFilterShow = true;
                const date = new Date();
                date.setDate(date.getDate() - 1);
                this.form.addControl('changedate', new FormControl(moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDTHH:mm')));
                this.form.addControl('changetTodate', new FormControl( moment(new Date()).format('YYYY-MM-DDTHH:mm')));
            } else {
                this.customFilterShow = false;
                this.form.removeControl('changedate');
                this.form.removeControl('changetTodate');
            }
        });

        this.form.get('operationFilter').valueChanges.subscribe((value) => {
            this.operationFilterIndex = value;
        });
    }

    public onDateSelect()
    {
        this.historyFilter['CreatedFrom'] = format(this.date ? (new Date(this.date)) : (new Date()),'YYYY-MM-DDTHH:mm');

        if (this.todate === undefined) {
            this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
        } else {
            this.historyFilter['CreatedBefore'] = format(new Date(this.todate),'YYYY-MM-DDTHH:mm');

        }
    }

    public getCreationDate(index?) {
        this.historyFilter['CreatedFrom'] = this.betsService.getCreatedFrom(index);
        this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
    }

    getBetsHistory(page) {
        this.page = page;

        if (!this.customFilterShow)
            this.getCreationDate(this.form.getRawValue().timeFilter);
        else {
            this.historyFilter['CreatedFrom'] = this.form.get('changedate').value;
            this.historyFilter['CreatedBefore'] = this.form.get('changetTodate').value;
        }

        const input = {
            id: null,
            index: page - 1,
            createdFrom: this.historyFilter['CreatedFrom'],
            createdBefore: this.historyFilter['CreatedBefore'],
            historyInPage: this.historyInPage,
            operationFilterIndex: this.operationFilterIndex,
            betStatusFilter: this.getBetsHistoryService.betStatuses,
            productId: this.form.get('productId').value
        };

        if (this.form.valid) {
            this.getBetsHistoryService.getBetsHistoryList(input);
        }
    }

    public submit(page) {
        this.customButtons = true;
        this.getBetsHistory(page);
        this.filterChanged = false;
        if (this.getBetsHistoryService.betsHistoryListCount === 0) {
            this.utilityService.showMessageWithDelay(this, [{ 'noHistory': this.translate.instant("User.No-History") }]);
        }
    }
    download(page) {
/*        this.page = page;
        const input = {
            id: null,
            index: page - 1,
            createdFrom: this.historyFilter['CreatedFrom'],
            createdBefore: this.historyFilter['CreatedBefore'],
            historyInPage: this.historyInPage,
            operationFilterIndex: this.operationFilterIndex,
            betStatusFilter: this.getBetsHistoryService.betStatuses,
            productId: this.form.get('productId').value
        };
        this.getBetsHistoryService.downloadBets(input).pipe(take(1)).subscribe(data => {
            if(data.ResponseCode == 0)
            {
                this.exportDataService.exportExcel(data.ResponseObject, 'ExportBetsHistory_' + moment().format());
            }
        });*/
        this.exportDataService.exportExcel( this.getBetsHistoryService.betsHistoryList, 'ExportBetsHistory_' + moment().format());

    }

    print()
    {
        window.print();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
