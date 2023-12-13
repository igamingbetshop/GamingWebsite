import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class SharedService
{
  public setLanguage$: Subject<string> = new Subject<string>();
  public mobileLeftSidebarOpen: Subject<any> = new Subject();
  public mobileRightSidebarOpen: Subject<any> = new Subject();
  public rightToLeftOrientation: BehaviorSubject<boolean> = new  BehaviorSubject(false);
  private _notifyRouteChangeToSport:Subject<string> = new Subject();
  public onRouteChangeForSport$ = this._notifyRouteChangeToSport.asObservable();

  public notifyRouteChangeToSport(url)
  {
    this._notifyRouteChangeToSport.next(url);
  }
  public notifyMigratedSportRouteChange(url:string)
  {
    const segments = url.split('/');
    const event = new CustomEvent('onRouteChange', {detail: {path:segments[segments.length - 1]}});
    window.dispatchEvent(event);
  }
}


