import {Component, Injector} from '@angular/core';
import {closeFullscreen, openFullscreen} from "@core/utils";
import {CommonOpenGamesComponent} from '../../common/common-open-games/common-open-games.component';
import {Location} from "@angular/common";
import {LogoutHelper} from "@core/services/helpers/logout.helper";
import {take} from "rxjs/operators";
import {faArrowsAlt} from "@fortawesome/free-solid-svg-icons";
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {SimpleModalService} from "ngx-simple-modal";


@Component({
  selector: 'app-app-open-games',
  templateUrl: './app-open-games.component.html',
  styleUrls: ['./app-open-games.component.scss']
})
export class AppOpenGamesComponent extends CommonOpenGamesComponent {

  public fullScreenActive: boolean = false;
  public faArrowsAlt = faArrowsAlt;

  constructor(public injector: Injector,
              private location:Location,
              private logoutHelper:LogoutHelper,
              private simpleModalService:SimpleModalService)
  {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.logoutHelper.onLogout$.pipe(take(1)).subscribe(() => {
      history.replaceState(null, null, localStorage.getItem('opened-url'));
    });
  }

  public goBack()
  {
    this.savedData.updateScrollPositionData(true, undefined, undefined);
    let t = localStorage.getItem('opened-url');
    this.router.navigateByUrl(t);
  }

  public openGameInFullScreen() {
    this.fullScreenActive = true;
    openFullscreen(document.getElementById("full-game-container"));
  }

  public closeFullScreen() {
    this.fullScreenActive = false;
    closeFullscreen();
  }

  onResize(event)
  {
    let heightElement = document.getElementById('full-game-container').offsetHeight;
    if (heightElement == 675 && this.fullScreenActive) {
      this.fullScreenActive = false;
    }
  }

  protected onProductUrlError(data)
  {
    super.onProductUrlError(data);
    /*If game hasn't demo mode*/
    if(data.ResponseCode == 174)
    {
      localStorage.setItem('product-url', this.router.url);
      this.simpleModalService.addModal(AppConfirmComponent, {
        title: 'open_login',
        message: true
      }).subscribe((isConfirmed) => {
        if(!isConfirmed)
          localStorage.removeItem('product-url');
      });
      this.location.back();
    }

  }

}
