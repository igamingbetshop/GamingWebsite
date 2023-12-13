import {Injectable, Injector} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from './shared.service';
import {ConfigService} from "@core/services";

@Injectable()

export class LangService {

  public translate: TranslateService;
  public sharedService: SharedService;
  private configService:ConfigService;

  public currentLang: any;
  public langList: Array<any> = [];

  constructor(public injector: Injector)
  {
    this.translate = injector.get(TranslateService);
    this.sharedService = injector.get(SharedService);
    this.configService = injector.get(ConfigService);
  }

  get currentLangKey(): string
  {
    return localStorage.getItem('lang') || 'en';
  }

  getCurrentLang(key)
  {
    let lang: any;
    if (key === '')
    {
      let currentLang = localStorage.getItem('lang') || 'en';
      lang = this.configService.defaultOptions.Languages.find(lang => lang.key == currentLang);
    }
    else
    {
      lang = this.configService.defaultOptions.Languages.find(lang => lang.key == key);
      this.sharedService.setLanguage$.next(key);
      window.location.reload();
    }
    return lang;
  }
}
