import {Component, Injector} from '@angular/core';
import {CommonGetTextComponent} from "../../common/common-get-text/common-get-text.component";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-terms',
  templateUrl: './mobile-terms.component.html',
  styleUrls: ['./mobile-terms.component.scss']
})
export class MobileTermsComponent extends CommonGetTextComponent {

  public showScroll: boolean = false;
  private scrollListener;

  constructor(injector: Injector, public layoutService:LayoutService) {
    super(injector);
    this.scrollListener = window.addEventListener('scroll', this.scrollHandler, {passive:true});
  }

  scrollHandler = () => {
    this.showScroll = window.scrollY > 200;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

}
