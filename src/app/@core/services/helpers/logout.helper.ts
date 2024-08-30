import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../app/localStorage.service';
import {ConfigService} from "@core/services";
import {Subject} from "rxjs";
import {SignalRService} from "@core/services/soket/signal-r.service";

@Injectable()
export class LogoutHelper {

    public defaultOptions: any;
    public onLogout$:Subject<boolean> = new Subject();

    private _logoutConfirmSbj:Subject<any> = new Subject();
    public onLogoutConfirm$ = this._logoutConfirmSbj.asObservable();

    constructor(private router: Router,
                private localStorageService: LocalStorageService,
                private signalRService:SignalRService,
                public configService: ConfigService) {

        this.defaultOptions = this.configService.defaultOptions;
        this.signalRService.onConnected.subscribe(data => {
            this.signalRService.onLogout$.subscribe(data => {
                this.logout();
            });
        })
    }

    logout(type = 0): boolean
    {
        if (this.localStorageService.get('user'))
        {
            this.onLogout$.next(true);
            this.localStorageService.remove('user');
            this.localStorageService.remove('defaultRoute');
            this.localStorageService.remove('popupShown');
            localStorage.removeItem('defaultRoute');
            localStorage.removeItem('token');
            localStorage.removeItem('selectedAccountId');
            this.localStorageService.remove("downLineClient");

            if (this.configService.defaultOptions.ShowLogoutInfoPopup && (this.configService.defaultOptions.ShowLogoutInfoPopup == '1')) {
                this.showConfirm(type);
            } else {
                window.location.reload();
            }
        }

        return true;
    }


    showConfirm(keyType)
    {
        this._logoutConfirmSbj.next(keyType);
    }
}
