import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";
@Injectable()

export class DataService {

  isVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isMigratedSportLoaded:boolean = false;
  private _mobileInternalPagesCurrentUrl:string = '';

  constructor(private router:Router) { }

  setMobileInternalPagesCurrentUrl()
  {
    this._mobileInternalPagesCurrentUrl = this.router.url;
  }

  getMobileInternalPagesCurrentUrl():string
  {
    return this._mobileInternalPagesCurrentUrl;
  }


}
