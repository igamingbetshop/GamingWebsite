import {Injectable, Injector} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetBetsHistoryService } from '@core/services/app/getBetsHistory.service';
import { GetTransactionsService } from '@core/services/app/getTransactions.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../base/base.component';
import {BetsService} from "@core/services/app/bets.services";
import {format} from "date-fns";
import {LocalStorageService} from "@core/services";
import {UtilityService} from "@core/services/app/utility.service";
import * as moment from "moment/moment";
@Injectable()
export class BaseTransactionsComponent extends BaseComponent {

  public betsService: BetsService;
  public getBetsHistoryService: GetBetsHistoryService;
  public getTransactionsService: GetTransactionsService;
  public fb: FormBuilder;
  public translate: TranslateService;
  public localStorageService: LocalStorageService;
  public utilityService: UtilityService;
  public historyTimeFilter: Array<any> = [
    { 'Name': 'Filter_Period.24 hours' },
    { 'Name': 'Filter_Period.3 days' },
    { 'Name': 'Filter_Period.7 days' },
    { 'Name': 'Filter_Period.1 month' },
    { 'Name': 'Filter_Period.Custom' }
  ];

  public page: number = 1;
  public noHistory;
  public historyPaymentFilterIndex: number = 0;
  public historyInPage: number = 10;
  public operationFilterIndex: number;
  public userData: any;

  public customFilterShow: boolean = false;
  public date: Date;
  public todate: Date;
  public historyTimeFilterIndex: number;
  public currentOperationFilter: any;

  public customCreatedFrom: any;
  public customCreatedBefore: any;
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
    this.form = this.fb.group({
      timeFilter: 0,
      operationFilter: 0
    });
  }

  ngOnInit() {
    super.ngOnInit();
    const userData = this.localStorageService.get('user');
    this.CurrencyId = userData ? userData.CurrencyId : '';
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
    this.getTransactionsService.getOperationTypes();

    if (this.getTransactionsService.operationTypes.length > 0) {
      this.getTransactionsHistory(1);
    } else {
      let subscription = this.getTransactionsService.notifyGetOperationTypes$.subscribe((data) => {
        // With Custom Dropdowns use that variable(with current item)
        this.currentOperationFilter = data[0];

        this.getTransactionsHistory(1);
        subscription.unsubscribe();
      });
    }

    this.form.get('timeFilter').valueChanges.subscribe((value) => {
      this.historyTimeFilterIndex = value;
      if (value == (this.historyTimeFilter.length - 1)) {
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

    this.getCreationDate(this.historyTimeFilter[0]);
  }

  public getCreationDate(input) {
    const index = typeof input === 'object' ? input.Id : input;
    if (index !== 4) {
      this.historyFilter['CreatedFrom'] = this.betsService.getCreatedFrom(input);
      this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
    } else {
      this.historyFilter['CreatedFrom'] = this.form.get('changedate').value;
      this.historyFilter['CreatedBefore'] = this.form.get('changetTodate').value;
    }
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
    this.getCreationDate(this.form.getRawValue().timeFilter);
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




  submit(page) {
    this.getTransactionsHistory(page);
    if (this.getTransactionsService.transactionsList.length === 0) {
      this.utilityService.showMessageWithDelay(this, [{ 'noHistory': this.translate.instant("User.No-History") }]);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
