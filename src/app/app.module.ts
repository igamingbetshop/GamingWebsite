import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JWTInterceptor } from '@core/interceptors/jwt.interceptor';
import {ConfigService} from "@core/services";
import {IConfig, provideEnvironmentNgxMask} from "ngx-mask";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha";
import {getRecaptchaKey} from "@core/utils";


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, window['debugPath'] + '/assets/json/translations/', '.json' + '?=' + window['VERSION']);
}


export function provideConfig(config: ConfigService) {
  return config.socialProvidersConfig;
}

export function initConfig(config: ConfigService)
{
  return () => config.load();
}
export class GlobalErrorHandler extends ErrorHandler {
  handleError(error) {
    // Custom error handling logic
    throw error;
  }
}

const maskConfig: Partial<IConfig> = {
  validation: true,
};

export const WINDOW = new InjectionToken<Window>('Window_Inject_Token', {
  factory: () => window
});


@NgModule({ declarations: [
        AppComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        RecaptchaV3Module,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient, ConfigService]
            }
        }),
        CoreModule.forRoot()], providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initConfig,
            deps: [ConfigService],
            multi: true
        },
        [
            { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
            { provide: RECAPTCHA_V3_SITE_KEY, useFactory: getRecaptchaKey, deps: [ConfigService] },
            /*{
              provide: AuthServiceConfig,
              deps: [ConfigService],
              useFactory: provideConfig
            }*/
            provideEnvironmentNgxMask(maskConfig)
        ],
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule
{

}
