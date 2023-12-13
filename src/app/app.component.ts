import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '@core/services';
import {ConfigService} from './@core/services/app/config.service';
import {DOCUMENT} from "@angular/common";
import {UserLogined} from "@core/services/app/userLogined.service";
import {BalanceService} from "@core/services/api/balance.service";
import {BaseApiService} from "@core/services/api/base-api.service";
import {take} from "rxjs";
import {FontModel} from "@core/interfaces";

declare let FontFace: any;

export interface BalanceCategory {
    balanceTimer: any;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    translationLoaded: boolean;
    isLogin: boolean;
    tets:never;
    balanceTimer;

    constructor(
        public translate: TranslateService,
        private shardService: SharedService,
        private configService: ConfigService,
        private balanceService: BalanceService,
        private userLogined: UserLogined,
        private baseApiService: BaseApiService,
        @Inject(DOCUMENT) private _document: Document) {
        translate.addLangs(this.configService.defaultOptions.Languages.map(lang => lang.key));
        const language = localStorage.getItem('lang') || this.configService.defaultOptions.ServerDefaultLang || this.configService.defaultOptions.DefaultLanguage;
        translate.setDefaultLang(language);
        localStorage.setItem('lang', language);
        this._document.documentElement.lang = language;
        this.shardService.setLanguage$.subscribe((lang) => {
            localStorage.setItem('lang', lang);
            translate.use(lang);
        });
        translate.use(language ? language : 'en').subscribe(data => {
            this.translationLoaded = true;
        });

        let font, fontBold, fontFamily;

        switch (language) {
            case "fa":
            case "f9":
                font = new FontFace(
                    "IRANSans",
                    "url(assets/fonts/IRANSansWeb_Light.woff2) format('woff2')",
                    {weight: "600"}
                );
                fontBold = new FontFace(
                    "IRANSans",
                    "url(assets/fonts/IRANSansWeb_Bold.woff2) format('woff2')",
                    {weight: "700"}
                );
                fontFamily = "IranSans, serif";
                break;
            case "he":
                font = new FontFace(
                    "Arimo",
                    "url(assets/fonts/ArimoBold.ttf)",
                    {weight: "400"}
                );
                fontBold = new FontFace(
                    "Arimo",
                    "url(assets/fonts/ArimoRegular.ttf)",
                    {weight: "700"}
                );
                fontFamily = "Arimo, sans-serif";
                break;
            case "ko":
                font = new FontFace(
                    "Luckysuper",
                    "url(assets/fonts/Luckysuper.ttf)",
                    {weight: "400"}
                );
                fontBold = new FontFace(
                    "Luckysuper",
                    "url(assets/fonts/Luckysuper.ttf)",
                    {weight: "700"}
                );
                fontFamily = "Luckysuper, sans-serif";
                break;
            default:
        }

        if (font) {
            Promise.all([
                font.load(),
                fontBold.load()
            ]).then((loadedFonts) => {
                // Render them at the same time
                loadedFonts.forEach(font => {
                    document['fonts']['add'](font);
                });
                document.body.style.fontFamily = fontFamily;
            });
        }

        this.isLogin = this.userLogined.isAuthenticated;
    }

    ngOnInit(): void {
        if (this.isLogin) {
            this.balanceService.getBalance();
        }
        this.getSystemFonts();

    }

    private getSystemFonts() {
        this.baseApiService.apiGet(`${window['debugPath'] || window.location.origin}/assets/json/fonts.json?=${window['VERSION']}`, null, '')
            .pipe(take(1)).subscribe(data => {
            if (data instanceof Array) {
                const fonts = data as Array<FontModel>;
                if (fonts.length) {
                    const fontsSources: any = [];
                    fonts.forEach(fontData => {
                        const font = new FontFace(fontData.FontFamily, `url(${window['debugPath']}/assets/fonts/${fontData.Src})`, {weight: fontData.Weight});
                        fontsSources.push(font.load());
                    });
                    Promise.all(fontsSources).then(loadedFonts => {
                        loadedFonts.forEach(font => {
                            font.family = font.family.split('_')[0];
                            document['fonts']['add'](font);
                        });
                        document.body.style.fontFamily = loadedFonts[0].family;
                    }, error => {

                    });
                }
            }
        });
    }
}
