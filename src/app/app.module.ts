import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JWTInterceptor } from '@core/interceptors/jwt.interceptor';
import {ConfigService} from "@core/services";
import {SimpleModalModule} from "ngx-simple-modal";


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

@NgModule({
  declarations: [
    AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SimpleModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, ConfigService]
      }
    }),
    CoreModule.forRoot(),
  ],

  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    },
    [
      {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
      /*{
        provide: AuthServiceConfig,
        deps: [ConfigService],
        useFactory: provideConfig
      }*/
    ]
  ]
})
export class AppModule
{

}
