import {Injectable, Injector} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LocalStorageService} from "../../../../@core/services";
import {BetsService} from "../../../../@core/services/app/bets.services";
import {GetBetsHistoryService} from "../../../../@core/services/app/getBetsHistory.service";
import {UtilityService} from "../../../../@core/services/app/utility.service";
import * as moment from "moment/moment";
import {format} from "date-fns";

@Injectable()

export class BaseAgentReportsComponent extends BaseComponent {
    public localStorageService: LocalStorageService;
    public fb: FormBuilder;
    public betsService: BetsService;
    public getBetsHistoryService: GetBetsHistoryService;
    public utilityService: UtilityService;
    public form: FormGroup;
    public CurrencyId: any;
    public currencySymbol: any;
    public historyFilter = {
        'FromDate': '',
        'ToDate': '',
        'FilterIndex': 0
    };
    public historyTimeFilter: Array<any> = [
        {'Name': 'Filter_Period.24 hours'},
        {'Name': 'Filter_Period.3 days'},
        {'Name': 'Filter_Period.7 days'},
        {'Name': 'Filter_Period.1 month'},
        {'Name': 'Filter_Period.Custom'}
    ];
    public page: number = 1;
    public date: Date;
    public todate: Date;
    public historyTimeFilterIndex: number;
    public historyInPage: number = 10;
    public customFilterShow: boolean = false;
    public openedParentId: number | null = null;
    public openedChildId: number | null = null;
    public openedChildIds: { [key: number]: boolean } = {};

    constructor(public injector: Injector) {
        super(injector);
        this.localStorageService = injector.get(LocalStorageService);
        this.fb = injector.get(FormBuilder);
        this.getBetsHistoryService = injector.get(GetBetsHistoryService);
        this.betsService = injector.get(BetsService);
        this.utilityService = injector.get(UtilityService);
        this.form = this.fb.group({
            timeFilter: 0
        });
    }

    ngOnInit() {
        super.ngOnInit();
        const userData = this.localStorageService.get('user');
        this.CurrencyId = userData ? userData.CurrencyId : '';
        this.currencySymbol = userData ? userData.CurrencySymbol : '';
        this.getAgentsReportHistory(1);

        this.form.get('timeFilter').valueChanges.subscribe((value) => {
            this.historyTimeFilterIndex = value;
            if (value == (this.historyTimeFilter.length - 1)) {
                this.customFilterShow = true;
                const date = new Date();
                date.setDate(date.getDate() - 1);
                this.form.addControl('changedate', new FormControl(moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDTHH:mm')));
                this.form.addControl('changedTodate', new FormControl(moment(new Date()).format('YYYY-MM-DDTHH:mm')));
            } else {
                this.customFilterShow = false;
                this.form.removeControl('changedate');
                this.form.removeControl('changedTodate');
            }
        });

        this.getCreationDate(this.historyTimeFilter[0]);
    }

    public getCreationDate(input) {
        const index = typeof input === 'object' ? input.Id : input;
        if (index !== 4) {
            this.historyFilter['FromDate'] = this.betsService.getCreatedFrom(input);
            this.historyFilter['ToDate'] = this.betsService.getCreatedBefore();
        } else {
            this.historyFilter['FromDate'] = this.form.get('changedate').value;
            this.historyFilter['ToDate'] = this.form.get('changedTodate').value;
        }
    }

    public onDateSelect() {
        this.historyFilter['FromDate'] = format(this.date, 'yyyy-MM-dd HH:mm');
        this.historyFilter['ToDate'] = format(this.todate, 'yyyy-MM-dd HH:mm');

        if (this.todate === undefined) {
            this.historyFilter['ToDate'] = this.betsService.getCreatedBefore();
        }

    }

    getAgentsReportHistory(page, parentId?) {
        this.page = page;
        this.getCreationDate(this.form.getRawValue().timeFilter);
        if (this.form.valid) {
            delete this.historyFilter['ParentId'];
            const input = {
                id: null,
                index: page - 1,
                createdFrom: this.historyFilter['FromDate'],
                createdBefore: this.historyFilter['ToDate'],
                ParentId: parentId || this.historyFilter['ParentId'],
                historyInPage: this.historyInPage
            };
            this.getBetsHistoryService.getAgentsReportHistory(input, parentId);
        }
    }

    openParentId(agentId: number | null) {
        if (this.openedParentId === agentId) {
            this.openedParentId = null;
            this.openedChildIds = {};
            this.form.removeControl('ParentId');
            delete this.historyFilter['ParentId'];
        } else {
            this.openedParentId = agentId;
            this.form.addControl('ParentId', new FormControl(String(agentId)));
            this.historyFilter['ParentId'] = this.form.get('ParentId')?.value;
            this.getAgentsReportHistory(this.page, agentId);
        }
    }

    openChildParentId(childAgentId: number) {
        if (this.openedChildIds[childAgentId]) {
            delete this.openedChildIds[childAgentId];
        } else {
            this.openedChildIds[childAgentId] = true;
            this.getAgentsReportHistory(this.page, childAgentId);
        }
    }

    submit(page) {
        this.getAgentsReportHistory(page);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
