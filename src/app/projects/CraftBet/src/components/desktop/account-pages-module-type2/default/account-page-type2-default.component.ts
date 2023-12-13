import {Component, Injector, OnInit, AfterViewInit} from '@angular/core';
import {CommonUserDefaultComponent} from "../../../common/common-user-default/common-user-default.component";
import {faCaretDown, faInfo, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { SaveData } from "@core/services";
import {Router} from "@angular/router";


@Component({
  selector: 'app-account-page-type2-default',
  templateUrl: './account-page-type2-default.component.html'
})
export class AccountPageType2DefaultComponent extends CommonUserDefaultComponent {
  public router: Router;
  constructor(public injector: Injector) {
    super(injector);
    this.savedDateService = injector.get(SaveData);
    this.router = injector.get(Router);
    this.router.events.subscribe((currentRoute) => {
      this.menuList.forEach(el => {
        el.SubMenu.forEach(subMenuItem => {
          if(this.router.url.includes(subMenuItem.Href)) {
            if(subMenuItem.Href !== '') {
              this.savedDateService.selectedItem = el;
              this.savedDateService.currentSubItem = el;
            }
          }
        })
      })
    })
  }


  public faCaretDown = faCaretDown;
  public savedDateService: SaveData;
  public redirected = false;


  ngOnInit() {
    super.ngOnInit();
  }
}
