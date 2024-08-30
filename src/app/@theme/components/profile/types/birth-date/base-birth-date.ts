import {AfterViewInit, Directive, ElementRef, Injector, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UtilityService} from "../../../../../@core/services/app/utility.service";
import {FormControl} from "@angular/forms";
import {BaseType} from "../base/base-type";
import {SharedService} from "@core/services";

@Directive()
export class BaseBirthDate extends BaseType implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('daysRef') daysRef:ElementRef;
    @ViewChild('monthsRef') monthsRef:ElementRef;
    @ViewChild('yearsRef') yearsRef:ElementRef;

    days: any;
    years: Array<any> = [];
    months: Array<any> = [];
    date = {
        Day: 0,
        Month: {
            'Name': '',
            'Id': 0
        },
        Year: 0
    };
    public rightToLeftOrientation: boolean = false;

    utilityService: UtilityService;
    public sharedService: SharedService;

    constructor(protected injector:Injector)
    {
        super(injector);
        this.utilityService = injector.get(UtilityService);
        this.sharedService = injector.get(SharedService);
    }

    ngOnInit()
    {
        this.initDate();
        this.years = this.utilityService.getYearsList();
        this.months = this.utilityService.changeYear(0);
        this.days = this.utilityService.changeMonth(this.date.Year, this.date.Month.Id);
        this.addControls();
    }

    ngOnDestroy()
    {

    }

    private initDate()
    {
        const d = new Date(this.profileService.getProfile.BirthDate);
        this.date.Day = d.getDate();
        this.date.Month.Id = d.getMonth() + 1;
        this.date.Year = (d.getFullYear() < this.years[this.years.length - 1]) ? this.years[this.years.length - 1] : d.getFullYear();
        this.sharedService.rightToLeftOrientation.subscribe((responseData) => {
            this.rightToLeftOrientation = responseData;
        });
    }

    private addControls()
    {
        this.formGroup.addControl('BirthDay', new FormControl(this.date.Day, []));
        this.formGroup.addControl('BirthMonth', new FormControl(this.date.Month.Id, []));
        this.formGroup.addControl('BirthYear', new FormControl(this.date.Year, []));
    }

    ngAfterViewInit()
    {
        this.yearsRef.nativeElement.value = this.date.Year;
        this.monthsRef.nativeElement.value = this.date.Month.Id;
        this.daysRef.nativeElement.value = this.date.Day;
    }

    onModelChange() {
        this.date.Year = this.yearsRef.nativeElement.value;
        this.date.Month.Id = this.monthsRef.nativeElement.value;
        this.date.Day = this.daysRef.nativeElement.value;
        this.formGroup.get('BirthDay').setValue(this.date.Day);
        this.formGroup.get('BirthMonth').setValue(this.date.Month.Id);
        this.formGroup.get('BirthYear').setValue(this.date.Year);
    }

    onChange: (value: any) => void = () => { };
    onTouch: any = () => { }
    writeValue(obj: any): void {

    }
    registerOnChange(fn: any): void {

    }
    registerOnTouched(fn: any): void {

    }
}