import {ApplicationRef, enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {enableDebugTools} from "@angular/platform-browser";

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(module => enableDebugTools(module.injector.get(ApplicationRef).components[0]))
    .catch(err => console.error(err));
