import {Injectable} from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {LocalStorageService} from "@core/services";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private localStorageService: LocalStorageService)
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    const user = this.localStorageService.get('user');
    if (!!user && user.Token)
    {
      return true;
    }
    else
    {
      if(route.data.deviceType === 'mobile')
      {
        this.router.navigate(['/login']);
      }
      else
      {
        this.router.navigate(['/casino/all-games']);
      }
      return false;
    }
  }

}
