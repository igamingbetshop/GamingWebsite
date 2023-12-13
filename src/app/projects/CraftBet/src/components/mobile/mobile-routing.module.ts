import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileMainComponent } from './mobile-main/mobile-main.component';
import {NavigationService} from "../../../../../@core/services/app/navigation.service";

const routes: Routes = [
    {
        path: '403-error',
        loadChildren: () => import('./mobile-error-page/mobile-error-page.module').then(m => m.MobileErrorPageModule)
    },
    {
        path: '',
        component: MobileMainComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./mobile-main.module').then(m => m.MobileMainModule),
            }
        ]
    },
    {
        path: '**',
        redirectTo: localStorage.getItem('defaultRoute') || '/home',
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MobileRoutingModule {
    constructor(private navigationService: NavigationService) {

    }
}
