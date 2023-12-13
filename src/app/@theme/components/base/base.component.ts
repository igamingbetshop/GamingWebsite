import {Directive, Injector, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

@Directive()
export class BaseComponent implements OnInit, OnDestroy
{

  protected subscriptions:Subscription[] = [];


  constructor(injector: Injector)
  {

  }

  ngOnInit() {

  }

  ngOnDestroy()
  {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
