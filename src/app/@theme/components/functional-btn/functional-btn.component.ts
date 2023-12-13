import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {getParsedUrl} from "../../../@core/utils";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {SimpleModalService} from "ngx-simple-modal";
import {BaseFrameComponent} from "../modals/base-frame/base-frame.component";
import {Methods} from "../../../@core/enums";
import {LogoutHelper} from "../../../@core/services/helpers/logout.helper";
import {SaveData} from "../../../@core/services";
import {StateService} from "../../../@core/services/app/state.service";

@Component({
  selector: 'functional-btn',
  templateUrl: './functional-btn.component.html',
  styleUrls: ['./functional-btn.component.scss']
})

export class FunctionalBtnComponent implements OnInit, OnDestroy {

  @Input() itemClassname: string;
  @Input() hasIcon: boolean = false;
  @Input() menuItem: any;
  @Input() openModal;

  public openedWindow: any;
  public data = {method:'', params:null, openMode:'', path:'', longPress:false}
  private _timeout: any;

  constructor(private baseApiService:BaseApiService,
              private logoutHelper:LogoutHelper,
              private simpleModalService:SimpleModalService,
              private router:Router,
              private stateService:StateService,
              private savedDateService: SaveData)
  {

  }

  @HostListener('mousedown') onMouseDown( e )
  {
    if(this.data.longPress)
    {
      this._timeout = setTimeout(() => {
        this.execute();
      }, 3000);
    }

  }

  @HostListener('touchstart') onTouchStart(e) {
    if (this.data.longPress) {
      this._timeout = setTimeout(() => {
        this.execute();
      }, 3000);
    }
  }

  @HostListener('mouseup') onMouseUp()
  {
    if(this.data.longPress)
      clearTimeout(this._timeout);
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    if(this.data.longPress)
      clearTimeout(this._timeout);
  }

  onClick(event:MouseEvent)
  {
    event.stopPropagation();

    if(!this.data.longPress)
      this.execute();
  }

  ngOnInit()
  {
    if(this.menuItem)
    {
      const parsedData = JSON.parse(JSON.parse(this.menuItem?.Href));
      if(parsedData)
      {
        this.data.method = parsedData.method.split('?')[0];
        if(this.data.method)
        {
          const params = getParsedUrl(parsedData.method);
          this.data.params = params;
          this.data.openMode = parsedData.openMode;
          this.data.longPress = parsedData.longPress;
        }
        else
        {
          this.data.path =  parsedData.href;
        }
      }
    }
  }

  ngOnDestroy()
  {

  }

  public popupCenter(url, target, w, h, settings = true)
  {
    let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen['left'];
    let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen['top'];

    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    let left = ((width / 2) - (w / 2)) + dualScreenLeft;
    let top = ((height / 2) - (h / 2)) + dualScreenTop;
    if (this.openedWindow)
      this.openedWindow.close();
    const features = settings ? 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left : undefined;
    this.openedWindow = window.open(url, target, features);

    if (window.focus) {
      this.openedWindow.focus();
    }
  }

  private execute()
  {
    if(this.data.method)
    {
      const isApiRequest = !!this.data.params['ApiRequest'];
      if(isApiRequest)
      {
        this.data.params.Method = this.data.method;
      }
      this.baseApiService.apiPost('', this.data.params, this.data.method, isApiRequest).pipe(take(1)).subscribe(data => {
        if(data.ResponseCode === 0)
        {
          if(this.data.method == Methods.LOGOUT_CLIENT)
            this.logoutHelper.logout();

          const url = data.ResponseObject.Url;
          switch (this.data.openMode)
          {
            case 'CurrentTab':
              this.popupCenter('', '_self', screen.width, screen.height);
              this.openedWindow.location.href = url;
              break;
            case 'NewTab':
              this.popupCenter('', '_blank', screen.width, screen.height, false);
              this.openedWindow.location.href = url;
              break;
            case 'Iframe':
              this.simpleModalService.addModal(BaseFrameComponent,
                  {
                    title: '',
                    url: url
                  },
                  {closeOnClickOutside: false}).subscribe(() => {
              });
              break;
            case 'NewWindow':
              this.popupCenter('', '_blank', screen.width * 0.5, screen.height * 0.5);
              this.openedWindow.location.href = url;
              break;
          }
        }
      });
    }
    else if (this.openModal)
    {
      this.savedDateService.getCurrentSubItem(this.menuItem);
      this.stateService.openModal({label:this.menuItem?.Href});
    }
    else
    {
      if(this.data.path.includes('http')){
        window.open(this.data.path, '_blank');
      }else {
        this.router.navigate([this.data.path]);
      }
    }
  }

}
