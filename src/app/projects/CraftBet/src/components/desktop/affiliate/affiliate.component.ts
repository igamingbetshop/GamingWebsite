import { Component } from '@angular/core';
import { BaseAffiliateComponent } from '../../../../../../@theme/components/common/base-affiliate/base-affiliate.component';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent extends BaseAffiliateComponent{
  public tabs = {
    affiliateAbout: 'About Affiliate',
    affiliateCommissions: 'About Commissions'
  };
  public selectedTab = this.tabs.affiliateAbout;
  selectTab(tab) {
    this.selectedTab = tab;
  }
}
