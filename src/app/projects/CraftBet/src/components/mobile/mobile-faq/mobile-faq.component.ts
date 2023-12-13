import {Component, Injector, OnDestroy} from '@angular/core';
import {CommonGetTextComponent} from "../../common/common-get-text/common-get-text.component";
import {LayoutService} from "../../../../../../@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-faq',
  templateUrl: './mobile-faq.component.html',
  styleUrls: ['./mobile-faq.component.scss']
})
export class MobileFAQComponent extends CommonGetTextComponent implements OnDestroy {

  public showScroll: boolean = false;
  private scrollListener;

  constructor(public injector: Injector, public layoutService:LayoutService) {
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
