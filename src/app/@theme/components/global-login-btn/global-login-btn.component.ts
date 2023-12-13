import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import { SaveData } from '../../../@core/services';

@Component({
    selector: 'app-global-login-btn',
    templateUrl: './global-login-btn.component.html',
    styleUrls: ['./global-login-btn.component.scss']
})
export class GlobalLoginBtnComponent implements OnInit, OnChanges {

    @Input() menuItem: any;
    @HostBinding('class') class:string;
    @Input() openModeType: string;
    @Input() modeOpenType: any;
    @Input() hasIcon: boolean = false;
    public itemClassname: string;
    public itemHref: any;
    public toggleClick: boolean = false;

    constructor(public saveData: SaveData, public router: Router) {
    }

    ngOnInit() {

    }
    ngOnChanges(changes: SimpleChanges)
    {
        if (changes.menuItem.currentValue) {
            this.itemClassname = changes.menuItem.currentValue.className;
            this.itemHref = changes.menuItem.currentValue.itemHref;
            this.class = changes.menuItem.currentValue.className + '-type';
        }
    }

    openLoginPopup(event:MouseEvent) {

        event.stopPropagation();
        // this.toggleClick = !this.toggleClick;
        this.toggleClick = true;
        if (this.toggleClick) {
            if (this.itemHref) {
                this.router.navigate(['/' + this.itemHref]);
            } else {
                if (this.openModeType !== undefined) {
                    let modeType = this.openModeType ? 3 : 1;
                    this.saveData.openPopup.next(modeType);
                } else {
                    if (this.modeOpenType === 'm-popup') {
                        this.saveData.openPopup.next('m-popup');
                    } else {
                        this.saveData.openPopup.next(1);
                    }
                }
            }
        } else {
            // 4 Close type  by button click
            this.saveData.openPopup.next(4);
        }
    }
}
