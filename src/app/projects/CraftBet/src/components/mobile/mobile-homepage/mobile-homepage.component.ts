import { Component, OnInit} from '@angular/core';
import { BaseHome} from '../../../../../../@theme/fragments/home/base-home';
import { FragmentSource} from '../../../../../../@core/enums';

@Component({
    selector: 'app-mobile-homepage',
    templateUrl: './mobile-homepage.component.html',
    styleUrls: ['./mobile-homepage.component.scss']
})
export class MobileHomepageComponent extends BaseHome implements OnInit{
    
    ngOnInit() {
        this.fragmentKey = FragmentSource.Mobile;
        super.ngOnInit();
    }
}
