import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {LocalStorageService} from "@core/services";

@Injectable({
    providedIn: 'root'
})

export class IsAgentGuard implements CanActivate {
    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.localStorageService.get('user');
        if (!!user && user.IsAgent === true) { // todo true
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
