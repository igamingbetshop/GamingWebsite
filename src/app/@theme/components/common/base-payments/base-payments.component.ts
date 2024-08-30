import {Directive, inject, Injector} from '@angular/core';
import {BaseComponent} from '../../../components/base/base.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ConfigService, LocalStorageService} from "@core/services";
import {GetPaymentsService} from '../../../../@core/services/app/getPayments.service';
import {PaymentControllerService} from '../../../../@core/services/app/paymentController.services';
import {TranslateService} from "@ngx-translate/core";
import {BaseInfoBlockComponent} from "../../modals/base-info-block/base-info-block.component";
import {BetsService} from "@core/services/app/bets.services";
import {format} from "date-fns";
import {UtilityService} from "@core/services/app/utility.service";
import {MatDialog} from "@angular/material/dialog";
import {AccountsFilterStateService} from "@core/services/app/accounts-filter-state.service";

@Directive()

export class BasePaymentsComponent extends BaseComponent {
  public historyTimeFilter: Array<any> = [
    {"Name": "Filter_Period.24 hours"},
    {"Name": "Filter_Period.3 days"},
    {"Name": "Filter_Period.7 days"},
    {"Name": "Filter_Period.1 month"},
    {"Name": "Filter_Period.Custom"}
  ];

  public paymentsFilter = [
    {"Id": 0, "Name": "Filter.All", Statuses: null},
    {"Id": 1, "Name": "Filter.Active", Statuses: [1]},
    {"Id": 4, "Name": "Filter.Cancelled", Statuses: [2, 11]},
    {"Id": 4, "Name": "Filter.In_Process", Statuses: [3, 5, 4, 7]},
    {"Id": 5, "Name": "Filter.Declined", Statuses: [6]},
    {"Id": 6, "Name": "Filter.Approved", Statuses: [8]},
    {"Id": 11, "Name": "Filter.Deleted", Statuses: [11]}
  ];

  public historyFilter = {
    'CreatedFrom': '',
    'CreatedBefore': '',
    'FilterIndex': 0
  };

  public historyTimeFilterIndex: number;

  public fb: FormBuilder;
  public form: FormGroup;
  public date: Date;
  public todate: Date;
  public customFilterShow: boolean = false;
  public takeCount: number = 10;
  public operationFilterIndex: number;
  public errorMessage: string;
  public page = 1;
  public userData: any;
  public filterChanged = false;
  public CurrencyId: any;
  public noHistory;
  public allowCancelConfirmedWithdraw;

  public betsService: BetsService;
  public localStorageService: LocalStorageService;
  public getPaymentsService: GetPaymentsService;
  public translate: TranslateService;
  public paymentControllerService: PaymentControllerService;
  dialog = inject(MatDialog);
  utilityService: UtilityService;
  configService: ConfigService;
  private accountsFilterStateService:AccountsFilterStateService;

  constructor(public injector: Injector) {
    super(injector);

    this.betsService = injector.get(BetsService);
    this.fb = injector.get(FormBuilder);
    this.localStorageService = injector.get(LocalStorageService);
    this.getPaymentsService = injector.get(GetPaymentsService);
    this.translate = injector.get(TranslateService);
    this.paymentControllerService = injector.get(PaymentControllerService);
    this.utilityService = injector.get(UtilityService);
    this.configService = injector.get(ConfigService);
    this.allowCancelConfirmedWithdraw = this.configService.defaultOptions.AllowCancelConfirmedWithdraw;
    this.accountsFilterStateService = injector.get(AccountsFilterStateService);

    this.form = this.fb.group({
      timeFilter: this.accountsFilterStateService.getState("payments")["timeFilterIndex"],
      type:  this.accountsFilterStateService.getState("payments")["type"],
      status: this.accountsFilterStateService.getState("payments")["status"],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    const userData = this.localStorageService.get('user');
    this.CurrencyId = userData ? userData.CurrencyId : '';
    this.getPaymentsService.getPaymentsTypesList();

    this.getPaymentsService.notifyGetCancelPaymentMessage$.subscribe((data) => {
      this.getPaymentData(this.page);
      this.paymentControllerService.getUserAccountData();
    });

    this.form.get('timeFilter').valueChanges.subscribe((value) => {
      this.historyTimeFilterIndex = value;
      if (value == (this.historyTimeFilter.length - 1)) {
        this.customFilterShow = true;
        const date = new Date();
        date.setDate(date.getDate() - 1);
        this.form.addControl('changedate', new FormControl(this.accountsFilterStateService.getState("payments")["fromDate"]));
        this.form.addControl('changetTodate', new FormControl(this.accountsFilterStateService.getState("payments")["toDate"]));
      } else {
        this.customFilterShow = false;
        this.form.removeControl('changedate');
        this.form.removeControl('changetTodate');
      }
    });
    this.form.get('timeFilter').setValue(this.accountsFilterStateService.getState("payments")["timeFilterIndex"]);
    this.form.get('status').setValue(this.accountsFilterStateService.getState("payments")["status"]);
    this.getPaymentData(1);
  }

  public onDateSelect() {
    this.historyFilter['CreatedFrom'] = format(this.date ? (new Date(this.date)) : (new Date()),'yyyy-MM-dd HH:mm');

    if (this.todate === undefined) {
      this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
    } else {
      this.historyFilter['CreatedBefore'] = format(new Date(this.todate),'yyyy-MM-dd HH:mm');

    }
  }

  public getCreationDate(index) {
    this.historyFilter['CreatedFrom'] = this.betsService.getCreatedFrom(index);
    this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
  }

  public canselPayment(paymentId) {
    this.getPaymentsService.cancelPayment(paymentId);
    this.getPaymentsService._notifyGetCancelPaymentErrorMessage.subscribe((data) => {
      this.utilityService.showMessageWithDelay(this, [{'errorMessage': data}]);
    });
  }

  public openInfoBlock(message) {

    this.dialog.open(BaseInfoBlockComponent, {data:{title: 'Payments_Info',message: message}});
  }

  public getPaymentData(page) {
    this.page = page;
    const formValue = this.form.getRawValue();

    if (!this.customFilterShow)
      this.getCreationDate(formValue.timeFilter);
    else {
      this.historyFilter['CreatedFrom'] = this.form.get('changedate').value;
      this.historyFilter['CreatedBefore'] = this.form.get('changetTodate').value;
    }

    const state:any = {timeFilterIndex:formValue.timeFilter,
      type:formValue.type,
      status:formValue.status || 0};

    if(this.customFilterShow)
    {
      state.fromDate = this.historyFilter['CreatedFrom'];
      state.toDate = this.historyFilter['CreatedBefore'];
    }

    this.accountsFilterStateService.setState("payments", state);


    const input = {
      createdFrom: this.historyFilter['CreatedFrom'],
      createdBefore: this.historyFilter['CreatedBefore'],
      status: this.paymentsFilter.find(p => p.Id === formValue.status).Statuses,
      type: formValue['type'],
      page: page - 1,
      takeCount: this.takeCount
    };
    if (this.form.valid) {
      this.getPaymentsService.getPaymentHistoryList(input);
    }
  }


  public submit(page) {
    this.getPaymentData(page);
    this.filterChanged = false;
    if (this.getPaymentsService.paymentHistoryItemsList.length === 0) {
      this.utilityService.showMessageWithDelay(this, [{ 'noHistory': this.translate.instant('User.No-History') }]);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
