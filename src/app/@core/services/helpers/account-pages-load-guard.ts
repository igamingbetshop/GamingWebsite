import {Injectable} from "@angular/core";
import {ActivatedRoute,CanLoad, Route, Router} from '@angular/router';
import {ConfigService, LocalStorageService, SaveData} from "@core/services";

@Injectable()
export class AccountPagesLoadGuard implements CanLoad {

    private isLoaded: boolean;
    public accountTemplateType = '1';

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private localStorageService: LocalStorageService,
                private saveData:SaveData,
                public configService: ConfigService)
    {
        this.isLoaded = false;
    }

    canLoad(route: Route): boolean
    {
        const user = this.localStorageService.get('user');
        if (!!user && user.Token && (route.data.roles === this.configService.defaultOptions.AccountTemplateType))
        {
            return true;
        }
        else
        {
            if(matchMedia('(max-width: 1200px)').matches)
            {
                this.router.navigate(['/login']);
            }
            else
            {
                this.saveData.openPopup.next("1");
                this.router.navigate(['/']);
            }
            return false;
        }
    }

}
