import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { CommonUserDefaultComponent } from '../../../common/common-user-default/common-user-default.component';
import { LocalStorageService, SaveData } from '../../../../../../../@core/services';
import { LayoutService } from '../../../../../../../@core/services/app/layout.service';

@Component({
  selector: 'app-mobile-account-page-type3-default',
  templateUrl: './mobile-account-page-type3-default.component.html',
  styleUrls: ['./mobile-account-page-type3-default.component.scss']
})
export class MobileAccountPageType3DefaultComponent extends CommonUserDefaultComponent implements AfterViewInit {
  public router: Router;
  public userData: any;
  public localStorageService: LocalStorageService;
  public savedDateService: SaveData;
  public redirected = false;
  public title: string;
  @ViewChild('horizontalScrollContainer', { static: true }) horizontalScrollContainer: ElementRef;

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
    this.localStorageService = injector.get(LocalStorageService);
    this.userData = this.localStorageService.get('user');
    this.savedDateService = injector.get(SaveData);
    this.router = injector.get(Router);
    this.router.events.subscribe((currentRoute) => {
      this.menuList.forEach(el => {
        el.SubMenu.forEach(subMenuItem => {
          if (this.router.url.includes(subMenuItem.Href)) {
            if (subMenuItem.Href !== '') {
              this.savedDateService.selectedItem = el;
              this.savedDateService.currentSubItem = el;
              console.log(this.savedDateService.currentSubItem);
            }
          }
        });
      });
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterViewInit() {
    this.scrollToItem(this.title);
  }

  scrollToItem(title: any) {
    const container = this.horizontalScrollContainer.nativeElement;
    const targetElements = Array.from(container.getElementsByClassName('mobile-title-menu active'));

    if (targetElements.length > 0) {
      const targetElement = targetElements[0] as HTMLElement;
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
