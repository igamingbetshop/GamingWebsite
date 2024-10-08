import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { LoaderState } from '../../../@theme/components/loader/loader';

@Injectable({providedIn:'root'})

export class LoaderService {

  private loaderSubject = new BehaviorSubject<LoaderState>({show:true});

  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{show: false});
  }
}
