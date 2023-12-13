import { Component, Injector } from '@angular/core';
import { BaseAffiliateComponent } from '../../../../../../@theme/components/common/base-affiliate/base-affiliate.component';
import { LayoutService } from '../../../../../../@core/services/app/layout.service';

@Component({
  selector: 'app-mobile-affiliate',
  templateUrl: './mobile-affiliate.component.html',
  styleUrls: ['./mobile-affiliate.component.scss']
})
export class MobileAffiliateComponent extends BaseAffiliateComponent {
  public tabs = {
    affiliateTitle: 'Affiliate-title',
    affiliateAbout: 'About Affiliate',
    affiliateCommissions: 'About Commissions'
  };
  public selectedTab = this.tabs.affiliateTitle;

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  selectTab(tab) {
    this.selectedTab = tab;
  }

}
