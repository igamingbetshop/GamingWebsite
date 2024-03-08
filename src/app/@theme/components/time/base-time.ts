import {Directive, Input} from "@angular/core";
import {ConfigService, LocalStorageService} from "../../../@core/services";
import * as moment from "moment/moment";
import {TimeZone} from "../../../@core/interfaces";
import {Subject, Subscription, takeUntil, timer} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Directive()

export class BaseTime {
    timeFilter:string;
    currentDate: any;
    timezones:TimeZone[] = [];
    subscription:Subscription;
    searchPattern:string;
    isDropDown:boolean = false;
    public userData: any;
    public lastLogin;
    @Input() menuItem:any;
    private readonly _stop = new Subject<void>();
    constructor(private config:ConfigService,private translate: TranslateService,
    private localStorageService: LocalStorageService) {
        this.userData = this.localStorageService.get('user');
        this.lastLogin = this.translate.instant('User.LastLogin');
    }

    ngOnInit()
    {
        this.subscription = new Subscription();
        this.timeFilter = this.config.defaultOptions.TimeFilter || "H:mm:ss";
        this.startTimer();
        this.isDropDown = this.menuItem.data.dropdown == 1;
        if(this.isDropDown)
            this.getTimezones();
    }

    async getTimezones()
    {
        const response = await fetch(`${window['debugPath'] || window.location.origin}/assets/json/timezones.json`);
        this.timezones = await response.json();
    }

    setTimeZone(timeZone:TimeZone)
    {
        this.config.timeZone = timeZone.offset;
        localStorage.setItem("timezone", timeZone.offset.toString());
        location.reload();
    }

    startTimer()
    {
        this._stop.next();
        const tz = this.config.timeZone <= 0 ? this.config.timeZone : "+" + this.config.timeZone;
        timer(0, 1000).pipe(takeUntil(this._stop)).subscribe(tick => {
            this.currentDate = moment().utcOffset(Number(this.config.timeZone)).format(this.timeFilter) + `(GMT${tz})`;
        });
    }
}