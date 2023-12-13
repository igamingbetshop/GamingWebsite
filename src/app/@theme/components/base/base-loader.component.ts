import {OnInit, OnDestroy, Directive, HostBinding} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '@core/services';
import {LoaderState} from "../loader/loader";

@Directive()
export class BaseLoaderComponent implements OnInit, OnDestroy {
  show = false;
  @HostBinding('style.display') display:string;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.display = this.show ? 'block' : 'none';
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
