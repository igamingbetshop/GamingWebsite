import {Injectable} from "@angular/core";
import {CanLoad, Route, Router} from '@angular/router';
import {ConfigService, SaveData} from "@core/services";
import {UserLogined} from "@core/services/app/userLogined.service";

@Injectable()
export class AccountPagesLoadGuard implements CanLoad {

    constructor(private router: Router,
                private userLogin:UserLogined,
                private saveData:SaveData,
                public configService: ConfigService)
    {

    }

    canLoad(route: Route): boolean
    {
        if (this.userLogin.isAuthenticated && (route.data.roles === this.configService.defaultOptions.AccountTemplateType))
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
                this.router.navigate([this.router.url]).then(() => {
                    const p = setTimeout(() => {
                        this.saveData.openPopup.next("1");
                        clearTimeout(p);
                    });
                });
            }
            return false;
        }
    }

}
