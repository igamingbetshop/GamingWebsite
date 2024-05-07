import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {LangService} from '../../../@core/services/app/lang.service';
import {ConfigService, SharedService} from "@core/services";


@Component({
    selector: 'app-global-language',
    templateUrl: './global-language.component.html',
    styleUrls: ['./global-language.component.scss']
})
export class GlobalLanguageComponent implements OnInit, OnDestroy {

    @Input() menuItem: any;
    @HostBinding('class') class:string;

    public itemClassname: string;
    public dropdownImage: string;
    public dropdownTitle: string;
    public dropdownKey: string;
    public itemTitle: string;
    public listTitle: boolean = false;

    public currentLang: any;
    public columnCount: number;
    public gridStyles:any;
    public rightLeftOrientation: boolean;

    public languages:any[];
    public isSingleLang: boolean;
    public isMobile: boolean;
    public openedDropDown = false;

    constructor(
        private langService: LangService,
        public sharedService: SharedService,
        public config: ConfigService
    ) {}

    ngOnInit() {
        if (this.menuItem) {
            this.setMenuItemData();
        }
        this.languages = this.config.defaultOptions['Languages'];
        this.isSingleLang = this.languages.length === 1;
        console.log(this.isSingleLang);
        this.columnCount = Math.round(this.config.defaultOptions.Languages.length / 11);

        this.gridStyles = {
            display: 'grid',
            'grid-template-columns': `repeat(${this.columnCount}, 1fr)`,
        };

        this.currentLang = this.langService.getCurrentLang('');

        if (this.currentLang['key'] === 'fa' || this.currentLang['key'] === 'f9' || this.currentLang['key'] === 'he')
        {
            this.sharedService.rightToLeftOrientation.next(true);
        }
        else
        {
            this.sharedService.rightToLeftOrientation.next(false);
        }
    }

    setMenuItemData(): void {
        this.itemClassname = this.menuItem.className;
        this.dropdownImage = this.menuItem.dropdownImage;
        this.dropdownTitle = this.menuItem.dropdownTitle;
        this.dropdownKey = this.menuItem.dropdownKey;
        this.itemTitle = this.menuItem.itemTitle;
        this.class = this.menuItem.className + '-type';
        this.isMobile = this.menuItem?.isMobile;
    }


    public changeLanguage(langKey)
    {
        if (langKey === 'fa' || langKey === 'f9' || langKey === 'he') {
            this.sharedService.rightToLeftOrientation.next(true);
        } else {
            this.sharedService.rightToLeftOrientation.next(false);
        }
        this.currentLang = this.langService.getCurrentLang(langKey);
    }

    ngOnDestroy()
    {

    }


}
