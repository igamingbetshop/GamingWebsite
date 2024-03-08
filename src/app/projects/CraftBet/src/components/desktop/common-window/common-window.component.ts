import {Component, Injector} from "@angular/core";
import {BaseComponent} from "../../../../../../@theme/components/base/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLogined} from "../../../../../../@core/services/app/userLogined.service";
import {SimpleModalService} from "ngx-simple-modal";

@Component({
    selector: 'app-common-window',
    templateUrl: './common-window.component.html'
})

export class CommonWindowComponent extends BaseComponent {
    public openMode = 0;
    protected route: ActivatedRoute;
    protected router: Router;
    protected userLoginService:UserLogined;
    protected simpleModalService:SimpleModalService;

    constructor(injector: Injector) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
        window.scroll(0, 0);
        this.router = injector.get(Router);
        this.userLoginService = injector.get(UserLogined);
        this.simpleModalService = injector.get(SimpleModalService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.openMode = this.getWebOpenType();
        /*const type = this.route.snapshot.params?.type;
        if(type === 'real' && !this.userLoginService.isAuthenticated)
        {
            localStorage.setItem('product-url', this.router.url);
            this.simpleModalService.addModal(AppConfirmComponent, {
                title: 'open_login',
                message: true
            }).subscribe((isConfirmed) => {
                if(!isConfirmed)
                    localStorage.removeItem('product-url');
            });
        }*/
    }

    getWebOpenType()
    {
        const openMode = this.route.snapshot.params.openType ? this.route.snapshot.params.openType : 1;
        const WebOpenMode = parseInt(String(openMode / 10), 10);

        if(WebOpenMode == 0) {
            return 1;
        }

        return WebOpenMode;
    }

}
