import {Directive, Injector} from '@angular/core';
import {BaseMainComponent} from "../../../../../../@theme/components/common/base-main/base-main.component";
import {Router, ActivatedRoute} from "@angular/router";
import {PopupsService} from "@core/services/app/popups.service";
import {ConfigService} from "@core/services";
import {fromEvent} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {BaseApiService} from "@core/services/api/base-api.service";
import {UserLogined} from "@core/services/app/userLogined.service";


@Directive()
export class CommonMainComponent extends BaseMainComponent {

    public router: Router;
    public activeRouter: ActivatedRoute;
    public popupsService: PopupsService;
    public showHeader: boolean = true;
    private initialHeight: string;
    public showScrollTop = false;
    public headerHeight;

    public newWindow;
    public config: ConfigService;
    protected baseApiService:BaseApiService;
    protected loginService:UserLogined;

    constructor(public injector: Injector) {
        super(injector);
        this.router = injector.get(Router);
        this.activeRouter = injector.get(ActivatedRoute);
        this.popupsService = injector.get(PopupsService);
        this.config = injector.get(ConfigService);
        this.baseApiService = injector.get(BaseApiService);
        this.loginService = injector.get(UserLogined);
    }

    ngOnInit() {
        super.ngOnInit();
        window.addEventListener('message', (event) =>
        {
            if(event.data['from'] == 'close-game')
            {
                this.router.navigate([this.configService.defaultOptions.HomePageType || '/home']);
            }
            else if (typeof event.data['origin'] !== 'undefined') {
                if (event.data['origin'] == 'sportsbook' && event.data['page'] == 'headerPanel')
                {
                    if (typeof event.data.headerPanel !== 'undefined') {
                        this.showHeader = event.data.headerPanel;
                        if (!this.initialHeight) {
                            this.initialHeight = getComputedStyle(document.documentElement)
                                .getPropertyValue('--full-screen-product-height');
                        }
                        document.documentElement.style
                            .setProperty('--full-screen-product-height', this.showHeader ? this.initialHeight : '100vh');
                    }
                }
                else if (event.data.popup === 'user-info' && event.data.origin === "sportsbook")
                {
                    this.openCustomPages(event.data.type);
                }
                else if(event.data['origin'] === 'iframe')
                {
                    if(event.data['path'])
                    {
                        this.router.navigate([event.data['path']]);
                    }
                    if(event.data.popup === 'not-login')
                    {
                        this.saveData.openPopup.next('1');
                    }
                }
            }
        });
        window.removeEventListener('openLogin', this.onOpenLogin);
        window.removeEventListener('openLink', this.onOpenLink);

        window.addEventListener('openLogin', this.onOpenLogin);
        window.addEventListener('openLink', this.onOpenLink);

    }

    openCustomPages(type) {
        this.popupsService.openCustomPage(type);
    }

    onOpenLogin = (data) =>
    {
        if(!this.userLogined.isAuthenticated)
            this.savedData.openPopup.next('1');
        else
        {
            if(data && data.detail && data.detail.hasOwnProperty('path'))
                this.router.navigate([data.detail.path]);
        }
    }
    onOpenLink = (data) =>
    {
        if(data && data.detail && data.detail.hasOwnProperty('path'))
            this.router.navigate([data.detail.path]);
    }

    async loadComponent():Promise<any>
    {

    }

    openCharacters()
    {
        if(this.userLogined.isAuthenticated && this.config.defaultOptions['CharactersEnabled'] == true && !this.userLogined.user.CharacterId){
            this.loadComponent().then(component => {
                if(component)
                {
                    this.simpleModalService.addModal(component, {
                        title: 'Characters',
                        message: true,
                        data: {},
                    },{closeOnClickOutside: false}).subscribe(
                        (result) => {

                            if(result)
                                this.router.navigate(['/casino/all-games']);
                        });
                }
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    addScrollListener() {
        fromEvent(window, 'scroll')
            .pipe(debounceTime(200))
            .subscribe(() => {
                this.showScrollTop = window.scrollY > this.headerHeight;
            });
    }
}
