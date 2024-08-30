import {Injector, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';

@Injectable()
export class CommonParentCasinoComponent extends BaseComponent {

  public route: ActivatedRoute;
  public router: Router;
  public slideKey:number = -1;

  constructor(public injector: Injector) {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.route.data.subscribe((routeData) => {
      this.slideKey = routeData.slideKey;
    });
  }
}
