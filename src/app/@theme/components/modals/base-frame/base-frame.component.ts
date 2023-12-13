import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {BaseApiService} from "@core/services/api/base-api.service";
import {take} from "rxjs";

export interface ConfirmModel {
  title: string;
  url:string;
  cancelUrl?:string;
}

@Component({
  selector: 'base-frame',
  templateUrl: './base-frame.component.html',
  styleUrls: ['./base-frame.component.scss']
})
export class BaseFrameComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit, OnDestroy {

  public title: string;
  public url:string;
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
        else if(data.data.data.cancelFromParent)
        {
          this.onClose();
        }
        else if(data.data.data.navigateByUrl)
        {
          window.location.href = data.data.data.navigateByUrl;
        }
      }
      else if(data.data.from === 'close-game')
      {
        this.close();
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
    this.close();
    if(this.cancelUrl)
    {
      this.baseApiService.apiGet(this.cancelUrl, null, '').pipe(take(1)).subscribe(data => {
      }, error => {
      });
    }
  }

  ngOnDestroy()
  {
    removeEventListener('message', this.onMessage);
  }

}
