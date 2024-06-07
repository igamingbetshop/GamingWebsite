import {OnInit, Injector, OnDestroy, Directive} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseControllerService} from "../../../../../../@core/services/app/baseController.service";
import {ConfigService, SaveData} from "../../../../../../@core/services";
import {getParsedUrl} from "../../../../../../@core/utils";

@Directive()
export class CommonHomepageComponent implements OnInit, OnDestroy {

    public route: ActivatedRoute;
    public baseControllerService: BaseControllerService;
    public configService: ConfigService;
    public homeMenuList: Array<any> = [];
    public router: Router;
    public saveData: SaveData;


    public slides = [];
    public defaultOption: any;

    slideKey: any;

    constructor(public injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.baseControllerService = injector.get(BaseControllerService);
        this.configService = injector.get(ConfigService);
        this.router = injector.get(Router);
        this.saveData = injector.get(SaveData);

        this.route.data.subscribe((routeData) => {
            this.slideKey = routeData.slideKey;
        });

        this.defaultOption = this.configService.defaultOptions;
    }

    ngOnInit() {
        window.addEventListener('message', (data) => {
            this.pageChangePath(data);
        }, );
    }

    ngOnDestroy(): void {
        window.removeEventListener("message", this.pageChangePath);
    }

    pageChangePath = (event) => {
        /* if (typeof event.data['origin'] !== 'undefined')
         {
           if (event.data['origin'] == 'sportsbook')
           {
             if (typeof event.data.path !== 'undefined')
             {
               window.location.hash = event.data.path;
             }
           }
           else if (event.data['origin'] === 'parent' && event.data['page'] === 'parent')
           {
             let state: any,
               params = [];
             if (event.data['path'].indexOf('?') > -1) {
               state = event.data['path'].split('?')[0];
               params = event.data['path'].split('?')[1].split('=');
             } else {
               state = event.data['path'];
             }

             if (params.length) {
               let paramName = params[0],
                 paramValue = params[1],
                 paramsObj = {};
               paramsObj[paramName] = paramValue;
             } else {
               this.router.navigate(['/' + state]);
             }
           }
           else if(event.data['page'] === 'direct')
             this.router.navigateByUrl(event.data['path']);
         }*/
        if (typeof event.data['origin'] !== 'undefined') {
            if (event.data['origin'] == 'widget') {
                if (typeof event.data.path !== 'undefined') {
                    this.router.navigateByUrl(event.data['path']);
                }
            }
        }

    }

    navigateTo(path: string)
    {
        let result = getParsedUrl(path);
        this.router.navigate(['/' + path.split('?')[0]], {queryParams: result ? result : null});
    }

    sliderInit(carouselName)
    {
        const el = document.querySelector('.' + carouselName);
        el.querySelectorAll('.mobile-content-item').forEach( ( item ) =>
        {
            item.addEventListener('click', this.onClick.bind(this));
        });
    }


    onClick(event)
    {
        const path = event.currentTarget.getAttribute('path');
        if(path)
            this.navigateTo(path);
    }

}
