import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BaseApiService} from "@core/services/api/base-api.service";
import {take} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'base-frame',
  templateUrl: './base-frame.component.html',
  styleUrls: ['./base-frame.component.scss']
})
export class BaseFrameComponent implements OnInit, OnDestroy {

  public deviceSize: any;
  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BaseFrameComponent>);
  private baseApiService = inject(BaseApiService);

  ngOnInit()
  {
    this.deviceSize = window.innerWidth;
    addEventListener('message', this.onMessage);
  }

  confirm()
 {
    this.dialogRef.close(true);
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
    if(this.data.cancelUrl)
    {
      this.baseApiService.apiGet(this.data.cancelUrl, null, '').pipe(take(1)).subscribe(data => {
        this.dialogRef.close();
      }, error => {
        this.dialogRef.close();
      });
    }
    else
    {
      this.dialogRef.close();
    }
  }

  ngOnDestroy()
  {
    removeEventListener('message', this.onMessage);
  }

}
