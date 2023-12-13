import {Injector, Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';

@Injectable()
export class CommonParentCasinoComponent extends BaseComponent {

  public route: ActivatedRoute;
  public slideKey:number = -1;

  constructor(public injector: Injector) {
    super(injector);
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit() {
    this.route.data.subscribe((routeData) => {
      this.slideKey = routeData.slideKey;
    });
  }
}
