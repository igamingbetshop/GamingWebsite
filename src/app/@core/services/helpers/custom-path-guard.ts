import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, CanLoad, Route, Router} from '@angular/router';
import {ConfigService, LocalStorageService} from "@core/services";

@Injectable()
export class CustomPathGuard implements CanLoad {

  private isLoaded: boolean;
  public accountTemplateType = '1';


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, public configService: ConfigService) {
    this.isLoaded = false;
  }

  canLoad(route: Route): boolean {

    const user = this.localStorageService.get('user');
    if (!!user && (route.data.roles === route.path)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
