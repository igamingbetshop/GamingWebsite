import {OnInit, Injector, Injectable} from '@angular/core';
import {GetSettingsService} from "@core/services/app/getSettings.service";
import {ExportDataService} from "@core/services";
import {BetsService} from "@core/services/app/bets.services";
import {format} from "date-fns";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Injectable()
export class AppCommonAnnouncementComponent implements OnInit {

  public activeTabItem: string = '4';
  public takeCount: number = 10;

  public settings = {
    bigBanner: true,
    format: 'dd/MM/yyyy',
    defaultOpen: false,
    timePicker: false,
    closeOnSelect: true
  };

  public date: string;
  public todate: string;
  public page: number = 1;

  public announcementsList: Array<any> = [];
  public announcementsItemsCount: number;

  public getSettingsService: GetSettingsService;
  public betsService: BetsService;
  public exportDataService: ExportDataService;
  public createdFrom: any;
  public createdBefore: any;
  public form: FormGroup;
  public fb: FormBuilder;

  constructor(public injector: Injector) {
    this.getSettingsService = injector.get(GetSettingsService);
    this.betsService = injector.get(BetsService);
    this.exportDataService = injector.get(ExportDataService);
    this.fb = injector.get(FormBuilder);
  }

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.form = this.fb.group({
      'FromDate': new FormControl(format(new Date(), 'yyyy-MM-dd')),
      'ToDate': new FormControl(format(new Date(date), 'yyyy-MM-dd'))
    });
    this.createdFrom = this.betsService.getCreatedFrom(0);
    this.createdBefore = this.betsService.getCreatedBefore();
    this.getAnnouncementsData(this.page, '1');

    this.getSettingsService.notifyGetAnnouncements.subscribe((responseData) => {
      this.announcementsList = responseData['Entities'];
      this.announcementsItemsCount = responseData['Count'];
    });

    this.changeTab(this.activeTabItem);
  }

  public onDateSelect() {
    this.createdFrom = format(new Date(this.date),'yyyy-MM-dd HH:mm');
    this.createdBefore = format(new Date(this.todate),'yyyy-MM-dd HH:mm');
    this.getAnnouncementsData(this.page, this.activeTabItem);

  }


  changeTab(type) {
    this.activeTabItem = type;
    this.getAnnouncementsData(this.page, type);
  }

  submit() {
    this.getAnnouncementsData(this.page, this.activeTabItem);
  }

  getAnnouncementsData(page, type) {
    this.page = page;
    // const today = new Date();
    // const tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);

    const input = {
      FromDate:  this.form.get('FromDate').value,
      ToDate: this.form.get('ToDate').value,
      Type: this.activeTabItem,
      TakeCount: this.takeCount,
      SkipCount: type === '3' ? 0 : page - 1
    };

    this.getSettingsService.getAnnouncementsList(input);
  }
  onFromDateChange(event) {
    this.form.get('FromDate').setValue(event.target.value);
    this.createdFrom = event.target.value;
    this.getAnnouncementsData(this.page, this.activeTabItem);
  }

  onToDateChange(event) {
    this.form.get('ToDate').setValue(event.target.value);
    this.createdBefore = event.target.value;
    this.getAnnouncementsData(this.page, this.activeTabItem);
  }

  exportToExcel() {
    this.exportDataService.exportExcel(this.announcementsList, 'customers');
  }

  exportToPDF() {

  }

}
