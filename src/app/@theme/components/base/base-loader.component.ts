import {OnInit, OnDestroy, Directive, HostBinding, inject} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '@core/services';
import {LoaderState} from "../loader/loader";

@Directive()
export class BaseLoaderComponent implements OnInit, OnDestroy {
  show = false;
  @HostBinding('style.display') display:string;

  private subscription: Subscription;
  private loaderService = inject(LoaderService);

  constructor() {
    this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderState) => {
          this.show = state.show;
          this.display = this.show ? 'block' : 'none';
          console.log(this.display);
        });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
