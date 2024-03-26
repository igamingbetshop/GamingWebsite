import {Injectable} from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {ConfigService, LocalStorageService} from "@core/services";
import {Observable} from "rxjs";
import {SaveData} from "../app/saveData.service";

@Injectable()
export class OpenGameGuard  {



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private saveData:SaveData,
              public configService: ConfigService)
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.localStorageService.get('user');
    if(route.params.type && route.params.type.startsWith('real'))
    {
      if (!!user && user.Token)
      {
        return true;
      }
      else
      {
        if(state.url.startsWith('/product'))
        {
          const demoUrl = state.url.replace('real', 'demo');
          this.router.navigateByUrl(demoUrl);
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
        }
      }
    }
    else
    {
      if(route.params.type && route.params.type.startsWith('demo'))
      {
        if (user && user.Token)
        {
          if(state.url.startsWith('/product'))
          {
            const realUrl = state.url.replace('demo', 'real');
            this.router.navigateByUrl(realUrl);
          }
        }
      }
      return true;
    }
  }

}
