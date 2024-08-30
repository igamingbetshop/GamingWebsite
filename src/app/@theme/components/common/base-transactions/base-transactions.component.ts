import {Directive, Injector} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetBetsHistoryService } from '@core/services/app/getBetsHistory.service';
import { GetTransactionsService } from '@core/services/app/getTransactions.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../base/base.component';
import {BetsService} from "@core/services/app/bets.services";
import {format} from "date-fns";
import {LocalStorageService} from "@core/services";
import {UtilityService} from "@core/services/app/utility.service";
import {AccountsFilterStateService} from "@core/services/app/accounts-filter-state.service";
@Directive()
export class BaseTransactionsComponent extends BaseComponent {

  public betsService: BetsService;
  public getBetsHistoryService: GetBetsHistoryService;
  public getTransactionsService: GetTransactionsService;
  public fb: FormBuilder;
  public translate: TranslateService;
  public localStorageService: LocalStorageService;
  public utilityService: UtilityService;
  private accountsFilterStateService:AccountsFilterStateService;
  public historyTimeFilter: Array<any> = [
    { 'Name': 'Filter_Period.24 hours' },
    { 'Name': 'Filter_Period.3 days' },
    { 'Name': 'Filter_Period.7 days' },
    { 'Name': 'Filter_Period.1 month' },
    { 'Name': 'Filter_Period.Custom' }
  ];

  public page: number = 1;
  public noHistory;
  public historyInPage: number = 10;
  public operationFilterIndex: number;
  public userData: any;

  public customFilterShow: boolean = false;
  public date: Date;
  public todate: Date;
  public historyTimeFilterIndex: number;
  public currentOperationFilter: any;

  public CurrencyId: any;
  public currencySymbol: any;
  public historyFilter = {
    'CreatedFrom': '',
    'CreatedBefore': '',
    'FilterIndex': 0
  };


  public form: FormGroup;


  constructor(public injector: Injector) {
    super(injector);

    this.fb = injector.get(FormBuilder);
    this.getBetsHistoryService = injector.get(GetBetsHistoryService);
    this.betsService = injector.get(BetsService);
    this.getTransactionsService = injector.get(GetTransactionsService);
    this.translate = injector.get(TranslateService);
    this.localStorageService = injector.get(LocalStorageService);
    this.utilityService = injector.get(UtilityService);
    this.accountsFilterStateService = injector.get(AccountsFilterStateService);
    this.form = this.fb.group({
      timeFilter: this.accountsFilterStateService.getState("transactions")["timeFilterIndex"],
      operationFilter: this.accountsFilterStateService.getState("transactions")["status"],
    });
    this.operationFilterIndex = this.accountsFilterStateService.getState("transactions")["status"];
  }

  ngOnInit() {
    super.ngOnInit();
    this.userData = this.localStorageService.get('user');
    this.CurrencyId = this.userData ? this.userData.CurrencyId : '';
    this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
    this.form.get('timeFilter').valueChanges.subscribe((value) => {
      this.historyTimeFilterIndex = value;
      if (value == (this.historyTimeFilter.length - 1)) {
        this.customFilterShow = true;
        const date = new Date();
        date.setDate(date.getDate() - 1);
        this.form.addControl('changedate', new FormControl(this.accountsFilterStateService.getState("transactions")["fromDate"]));
        this.form.addControl('changetTodate', new FormControl(this.accountsFilterStateService.getState("transactions")["toDate"]));
      } else {
        this.customFilterShow = false;
        this.form.removeControl('changedate');
        this.form.removeControl('changetTodate');
      }
    });
    this.form.get('timeFilter').setValue(this.accountsFilterStateService.getState("transactions")["timeFilterIndex"]);
    this.form.get('operationFilter').setValue(this.accountsFilterStateService.getState("transactions")["status"]);
    this.getData();
  }



  getData() {
    if (this.userData.IsAgent === false) { // todo false
      this.getTransactionsService.getOperationTypes();
      this.form.get('operationFilter').valueChanges.subscribe((value) => {
        this.operationFilterIndex = value;
      });
      this.getTransactionsHistory(1);
    } else if (this.userData.IsAgent === true)
    {
      this.getTransactionsReport(1);
    }
  }

  getCreationDate(index?) {
    this.historyFilter['CreatedFrom'] = this.betsService.getCreatedFrom(index);
    this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
  }

  public onDateSelect() {
    this.historyFilter['CreatedFrom'] = format(this.date,'yyyy-MM-dd HH:mm');
    this.historyFilter['CreatedBefore'] = format(this.todate,'yyyy-MM-dd HH:mm');

    if (this.todate === undefined) {
      this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
    }

  }


  getTransactionsHistory(page) {
    this.page = page;
    this.saveFilterState();
    if (this.form.valid) {
      const input = {
        id: null,
        index: page - 1,
        createdFrom: this.historyFilter['CreatedFrom'],
        createdBefore: this.historyFilter['CreatedBefore'],
        historyInPage: this.historyInPage,
        operationFilterIndex: this.operationFilterIndex,
        operationTypeId: this.form.get('operationFilter').value
      };

      this.getTransactionsService.getTransactionList(input);
    }
  }

  getTransactionsReport(page) {
    this.page = page;
    this.saveFilterState();
    const input = {
      id: null,
      index: page - 1,
      FromDate: this.historyFilter['CreatedFrom'],
      ToDate: this.historyFilter['CreatedBefore'],
      historyInPage: this.historyInPage,
      operationFilterIndex: this.operationFilterIndex,
      operationTypeId: this.form.get('operationFilter').value
    };
    this.getTransactionsService.getTransactionsReport(input);
  }


  submit(page) {
    if (this.userData.IsAgent === false) { // todo false
      this.getTransactionsHistory(page);
    } else if (this.userData.IsAgent === true) { // todo true
      this.getTransactionsReport(page);
    }
  }

  private saveFilterState()
  {
    if (!this.customFilterShow)
      this.getCreationDate(this.form.getRawValue().timeFilter);
    else {
      this.historyFilter['CreatedFrom'] = this.form.get('changedate').value;
      this.historyFilter['CreatedBefore'] = this.form.get('changetTodate').value;
    }

    const state:any = {timeFilterIndex:this.form.getRawValue().timeFilter,
      status:this.operationFilterIndex || 0};

    if(this.customFilterShow)
    {
      state.fromDate = this.historyFilter['CreatedFrom'];
      state.toDate = this.historyFilter['CreatedBefore'];
    }

    this.accountsFilterStateService.setState("transactions", state);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
