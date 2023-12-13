import {Component, Injector, OnDestroy} from '@angular/core';
import {CommonGetTextComponent} from "../../common/common-get-text/common-get-text.component";
import {LayoutService} from "@core/services/app/layout.service";
import {faArrowCircleUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-mobile-privacy',
  templateUrl: './mobile-privacy.component.html',
  styleUrls: ['./mobile-privacy.component.scss']
})
export class MobilePrivacyComponent extends CommonGetTextComponent implements OnDestroy {

  public showScroll: boolean = false;
  public faArrowCircleUp = faArrowCircleUp;
  private readonly scrollListener;

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
