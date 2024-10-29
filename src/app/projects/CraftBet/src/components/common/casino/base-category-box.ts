import {OnInit, Injector, Directive, OnDestroy, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Fragment} from "../../../../../../@core/models";
import {ConfigService} from "../../../../../../@core/services";
import {getFragmentsByType} from "../../../../../../@core/utils";
import {Subscription} from "rxjs";
import {BaseApiService} from "../../../../../../@core/services/api/base-api.service";
import {UserLogined} from "../../../../../../@core/services/app/userLogined.service";

@Directive()
export class BaseCategoryBox implements OnInit, OnDestroy {

  config: ConfigService;
  fragmentKey: string;
  fragments: {[key: string]: Fragment}
  position:string;
  private readonly route: ActivatedRoute;
  public readonly router: Router;
  public baseApiService:BaseApiService;

  private subscription:Subscription = new Subscription();
  protected userLogin = inject(UserLogined);
  constructor(protected injector: Injector)
  {
    this.config = injector.get(ConfigService);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.baseApiService = injector.get(BaseApiService);
  }

  ngOnInit()
  {
    const block = this.config.defaultOptions[this.fragmentKey];
    this.position = this.route.snapshot.data['position'];
    this.fragments = getFragmentsByType(block, this.position, null, this.userLogin);
    this.subscription.add(this.route.params.subscribe(params =>
    {

    }));
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
