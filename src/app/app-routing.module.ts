import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StateService} from "@core/services/app/state.service";

const desktopPreloadModules = [
    {
        path:"telegramauth",
        loadComponent:() => import("../app/social-networks/telegram.component").then(c => c.TelegramComponent)
    },
    {
        path: '', loadChildren: () =>
            import('./projects/CraftBet/src/components/desktop/desktop.module').then(d => d.DesktopModule)
    }
];

const mobilePreloadModules = [
    {
        path:"telegramauth",
        loadComponent:() => import("../app/social-networks/telegram.component").then(c => c.TelegramComponent)
    },
    {
        path: '', loadChildren: () =>
            import('./projects/CraftBet/src/components/mobile/mobile.module').then(d => d.MobileModule)
    },

];



const appRoutes: Routes = [
    {
        path:'',
        component:AppComponent,
        children:[...desktopPreloadModules]
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{
    isFirstTime:boolean = true;
    constructor( private router: Router,
                 private route: ActivatedRoute,
                 private stateService:StateService)
    {
        this.stateService.isMobile$.subscribe(data => {
            this.checkDevice(data, this.isFirstTime);
            this.isFirstTime = false;
        });
    }

    private checkDevice(isMobile, routeToDefaultPath:boolean = false)
    {
        const routesBasedOnScreenSize = this.buildRoutes(isMobile);

        this.router.resetConfig(routesBasedOnScreenSize);

        if (routeToDefaultPath === false)
        {
            this.router.navigate([], { relativeTo: this.route });
        }
    }

    private buildRoutes(isMobile: boolean): Routes | null {
        const routes: Routes = appRoutes;

        if (isMobile) {
            routes[0].component = AppComponent;
            routes[0].children = mobilePreloadModules;
        } else {
            routes[0].component = AppComponent;
            routes[0].children = desktopPreloadModules;
        }

        return routes;
    }

}
