import {Injectable, Injector} from '@angular/core';
import {UserLogined} from "@core/services/app/userLogined.service";

@Injectable()
export class PopupsService {
  public newWindow;
  public isLogin: boolean;

  constructor(public injector: Injector, public userLogined: UserLogined) {
    this.isLogin = userLogined.isAuthenticated;
  }


  openCustomPage(type) {

    if (this.isLogin) {
      let routeName = type == 0 ? 'betList' : type == 1 ? 'betting-statement' : type == 2 ? 'settings' : type == 3 ? 'announcement' : '';
      localStorage.setItem('deviceType', JSON.stringify('2'));
      let redirect_url = window.location.origin + '/custom/' + routeName;
      if (this.newWindow == undefined) {
        this.newWindow = window.open(redirect_url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=1000,height=800");
      } else if (this.newWindow.closed) {
        this.newWindow = window.open(redirect_url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=1000,height=800");
      } else if (!this.newWindow.closed) {
        this.newWindow.location.href = redirect_url;
      }
    } else {
      alert('Please Login');
    }
  }


}
