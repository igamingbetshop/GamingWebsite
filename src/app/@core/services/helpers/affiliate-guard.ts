import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '@core/services';

@Injectable()
export class AffiliateGuard {
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private localStorageService: LocalStorageService) {}

    canActivate(): boolean {
        const user = this.localStorageService.get('user');
        if (!!user && user.Token) {
            return true;
        } else {
            this.router.navigate(['/affiliate/overview']);
            return false;
        }

    }
}
