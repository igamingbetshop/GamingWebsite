import {AfterViewInit, Directive, ElementRef, Injector, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {BaseType} from "../base/base-type";
import {Language} from "../../../../../@core/interfaces";
import {ConfigService} from "../../../../../@core/services";

@Directive()
export class BaseLanguage extends BaseType implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('selectRef') selectRef:ElementRef;

    languages:Language[];

    private configService:ConfigService;

    constructor(protected injector:Injector)
    {
        super(injector);
        this.configService = injector.get(ConfigService);
    }

    ngOnInit()
    {
        this.languages = this.configService.defaultOptions['Languages'];
    }

    ngAfterViewInit()
    {
        this.selectRef.nativeElement.value = this.formGroup.get(this.formControlName).value;
    }

    selectLanguage()
    {
        this.formGroup.get(this.formControlName).setValue(this.selectRef.nativeElement.value);
    }

    ngOnDestroy()
    {

    }
}