import {AfterViewInit, Component, createNgModuleRef, Injector} from '@angular/core';
import {CommonMainComponent} from '../../common/common-main/common-main.component';
import {SimpleModalService} from "ngx-simple-modal";
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {Location} from '@angular/common';
import {BaseControllerService} from "@core/services/app/baseController.service";
import {LoaderService, SharedService} from "@core/services";

import {ContentClasses} from "../../../../services/enums/dynamicllyClasses";
import {ActivatedRoute} from "@angular/router";
import {fromEvent} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
    selector: 'app-app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent extends CommonMainComponent implements AfterViewInit {

    public showFooterComponent: boolean = true;

    public contentClassesName: any;
    public headerPropertyName = '--header-panel1-height';
    public rightToLeftOrientation: boolean = false;

    constructor(public injector: Injector,
                private location: Location,
                private route: ActivatedRoute,
                public simpleModalService: SimpleModalService,
                public baseControllerService: BaseControllerService,
                public loaderService:LoaderService,
                public sharedService: SharedService) {
        super(injector);
    }

    openRegister() {
        let disposable = this.simpleModalService.addModal(AppConfirmComponent, {
            title: "register",
            message: true,
        }, {}).subscribe((isConfirmed) => {
        });


    }

    ngOnInit() {
        super.ngOnInit();

        // this.route.snapshot.data.products.items.find(data => {
        //     console.log(data, 'data *** ////');
        // });

        this.checkVisibilityFooter();

        this.location.onUrlChange((x) => {
            this.checkVisibilityFooter();
        });

        this.sharedService.rightToLeftOrientation.subscribe((recponceData) => {
            this.rightToLeftOrientation = recponceData;
        });
        this.openCharacters();
    }

    ngAfterViewInit() {
        this.headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue(this.headerPropertyName), 10);
        this.addScrollListener();
    }

    override async loadComponent():Promise<any>
    {
        const { CharactersModule } = await import('../fragments/characters/characters.module');
        const moduleRef = createNgModuleRef(CharactersModule, this.injector);
        const component = moduleRef.instance.getComponent();
        return component;
    }

    checkVisibilityFooter() {
        let currentUrl = this.router.url;
        currentUrl = currentUrl.substring(currentUrl.indexOf("/") + 1);
        if (currentUrl.includes('/')) {
            currentUrl = currentUrl.substring(0, currentUrl.indexOf('/'));
        }

        let data: Array<any> = this.configService.defaultOptions.FooterVisibility.filter((responseData) => {
            if (responseData.Title == currentUrl) {
                return responseData;
            }
        });

        this.baseControllerService.GetMenu('HeaderPanel2Menu', 'en').then((data1: any) => {
            let panel1MenuItems = data1.filter((item) => {
                const styleTypeItem = item['StyleType'];
                if (this.userLogined.isAuthenticated) {
                    if (JSON.parse(JSON.parse(styleTypeItem)).visibility !== 'loggedOut') {
                        return item;
                    }

                } else {
                    if (JSON.parse(JSON.parse(styleTypeItem)).visibility !== 'loggedIn') {
                        return item;
                    }
                }

            });


            if (data.length > 0)
            {
                const mainContainer = document.getElementById('main-container');
                if (data[0].Type === '1') {
                    this.showFooterComponent = true;
                    if(mainContainer)
                        mainContainer.classList.remove('fullHeight');
                    const el = document.getElementById('default_sectioon');
                    if(el)
                        el.classList.remove('removeFooter');
                } else if (data[0].Type === '2') {
                    this.showFooterComponent = true;
                    if(mainContainer)
                        mainContainer.classList.remove('fullHeight');
                    const el = document.getElementById('default_sectioon');
                    if(el)
                        el.classList.remove('removeFooter');
                } else {
                    this.showFooterComponent = false;
                    this.contentClassesName = (panel1MenuItems.length > 0) ? ContentClasses.Content_Without_Footer_Two_Line_Header : (panel1MenuItems.length == 0) ? ContentClasses.Content_Without_Footer_One_Line_Header : ContentClasses.Content_Without_Footer;
                    if(mainContainer)
                        mainContainer.classList.add('fullHeight');
                    document.getElementById('default_sectioon').classList.add('removeFooter');
                }
            } else {
                this.showFooterComponent = true;
            }
        });

    }
}
