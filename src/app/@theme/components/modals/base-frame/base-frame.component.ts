import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {BaseApiService} from "@core/services/api/base-api.service";
import {take} from "rxjs";

export interface ConfirmModel {
  title: string;
  url:string;
  cancelUrl?:string;
  closable?:boolean;
}

@Component({
  selector: 'base-frame',
  templateUrl: './base-frame.component.html',
  styleUrls: ['./base-frame.component.scss']
})
export class BaseFrameComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit, OnDestroy {

  public title: string;
  public url:string;
  public closable:boolean = true;
  public cancelUrl?:string;
  public deviceSize: any;

  constructor(private baseApiService:BaseApiService)
  {
    super();
  }

  ngOnInit()
  {
    this.deviceSize = window.innerWidth;
    addEventListener('message', this.onMessage);
  }

  confirm() {
    this.close();
  }

  onMessage = (data) =>
  {
    if(data)
    {
      if(data.data.from === 'paymentForm')
      {
        if(data.data.data.height)
        {
          const frame = document.getElementById('frame') as HTMLIFrameElement;
          if(frame)
          {
            frame.style.height = data.data.data.height + 'px';
            document.getElementById('paymentFrame').style.height = 'auto';
            frame.focus();
          }
        }
        else if(data.data.data.redirectUrl)
        {
          window.location.href = data.data.data.redirectUrl;
        }

      }
      else if(data.data.from === 'registerForm')
      {
        if(data.data.data.height || data.data.data.width)
        {
          const frame = document.getElementById('frame') as HTMLIFrameElement;
          if(frame)
          {
            if(data.data.data.height)
              frame.style.height = data.data.data.height + 'px';
            if(data.data.data.width)
              frame.style.width = data.data.data.width + 'px';
            document.getElementById('paymentFrame').style.height = 'auto';
            frame.focus();
          }
        }
      }

    }
  }

  onClose()
  {
    /*const frame = document.getElementById('frame') as HTMLIFrameElement;
    if(frame)
    {
      frame.contentWindow.postMessage({"from": "website", "data": {close:true}}, '*');
    }
    const p = setTimeout(() => {
      this.close();
    }, 500);*/
    if(this.cancelUrl)
    {
      this.baseApiService.apiGet(this.cancelUrl, null, '').pipe(take(1)).subscribe(data => {
        this.close();
      }, error => {
        this.close();
      });
    }
    else
    {
      this.close();
    }
  }

  ngOnDestroy()
  {
    removeEventListener('message', this.onMessage);
  }

}
