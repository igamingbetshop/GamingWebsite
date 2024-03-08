import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {BaseMobileOpenGameComponent} from "../../../../../../@theme/components/common/base-mobile-open-game/base-mobile-open-game.component";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'mobile-open-games',
    templateUrl: 'mobile-open-games.component.html',
    styleUrls: ['./mobile-open-games.component.scss']
})
export class MobileOpenGamesComponent extends BaseMobileOpenGameComponent implements OnInit, AfterViewInit{
    private readonly _mobileOpenGameSize = new BehaviorSubject<string>('calc(100vh - 64px)');
    public readonly onMobileOpenGameSize$ = this._mobileOpenGameSize.asObservable();
    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngAfterViewInit() {
        this.sizeCheck();
    }

    sizeCheck() {
        const header = document.getElementById('mobile-header-section');
        const bottomSideBar = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bottom-sideBar-height')) || 64;
        if (header && bottomSideBar) {
            this.setMobileOpenGameHeight({height: header.offsetHeight + bottomSideBar});
        } else {
            this.setMobileOpenGameHeight({height: header.offsetHeight});
        }
    }
    setMobileOpenGameHeight(sizes:any) {
        const productHeight:string = ` calc(100vh - ${sizes.height}px)`;
        sizes.productHeight = productHeight || 'calc(100vh - 64px)';
        this._mobileOpenGameSize.next(sizes);
    }

}