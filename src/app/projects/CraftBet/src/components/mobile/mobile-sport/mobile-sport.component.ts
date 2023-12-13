import {Component, OnDestroy, OnInit} from '@angular/core';

import {DataService, LocalStorageService} from "@core/services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import {StateService} from "../../../../../../@core/services/app/state.service";

@Component({
    selector: 'app-mobile-sport',
    templateUrl: './mobile-sport.component.html',
    styleUrls: ['./mobile-sport.component.scss']
})
export class MobileSportComponent implements OnInit, OnDestroy
{
    public externalWebComponentUrl:string = '';
    private subscription:Subscription;

    constructor(private localStorageService: LocalStorageService,
                private router: Router,
                private route: ActivatedRoute,
                public stateService:StateService,
                private dataService: DataService)
    {

    }

    ngOnInit()
    {
        window.removeEventListener('sportsbookFilesLoaded', this.onSportsbookFilesLoaded);
        window.addEventListener('sportsbookFilesLoaded', this.onSportsbookFilesLoaded);
        this.subscription = new Subscription();
        if(!this.dataService.isMigratedSportLoaded)
        {
            const scriptElement = document.createElement('script');
            scriptElement.src = window['debugPath'] + '/website/sportsbook.js?=' + Math.random();
            document.body.appendChild(scriptElement);
            this.dataService.isMigratedSportLoaded = true;
        }
        this.subscription.add(this.router.events.subscribe(value =>
            {
                if(value instanceof NavigationEnd)
                {
                   this.setSportsbookInitialUrl();
                }
            })
        );
        // this.route.params.subscribe(param =>
        // {
        //     if(param?.sportType?.startsWith('prematch') || param?.sportType?.startsWith('live'))
        //     {
        //         this.externalWebComponentUrl = '/' +  param.sportType;
        //     }
        // });
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

    onSportsbookFilesLoaded = (data) => {
        console.log('onSportsbookFilesLoaded');
        this.setSportsbookInitialUrl();
    }

    private setSportsbookInitialUrl()
    {
        if(this.router.url.startsWith('/sport'))
            this.externalWebComponentUrl = this.router.url.split("/sport")[1];
    }

}
