import {Component, Input, ViewChild} from "@angular/core";
import {BannersService} from "../../../../../../@core/services/api/banners.service";
import {Router} from "@angular/router";
import {AppConfirmComponent} from "../../desktop/app-confirm/app-confirm.component";
import {SimpleModalService} from "ngx-simple-modal";
import {SlickCarouselComponent} from "ngx-slick-carousel";
import {UserLogined} from "../../../../../../@core/services/app/userLogined.service";

@Component({
    selector: 'common-banner',
    templateUrl: './common-banner.component.html',
    styleUrls: ['./common-banner.component.scss']
})

export class CommonBannerComponent {

    @ViewChild("slickModal") slickModal: SlickCarouselComponent;
    @Input() showSlideArrow = true;

    @Input('slideKey') set slideKey(value: number)
    {
        this.bannerService.getBanners(value).pipe().subscribe(banners =>
        {
            this.slides = banners;
            this.slideConfig.dots = this.slideConfig.arrows = (this.slides.length > 1) && this.showSlideArrow;
            this.slickModal.config = this.slideConfig;
        });
    };

    @Input('slideConfig') slideConfig: any = {
        rows: 1,
        dots: false,
        enabled: true,
        autoplay: true,
        vertical: false,
        arrows: false,
        infinite: true,
        speed: 4000,
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    public slides: Array<any> = [];

    constructor(public bannerService: BannersService,
                private router: Router,
                public authService: UserLogined,
                private simpleModalService: SimpleModalService) {
    }

    public redirectAnotherUrl(pageUrl) {
        if(pageUrl.includes('http')){
            window.open(pageUrl, '_blank');
        }else
        {
            /*open product with external window*/
            if(pageUrl.includes("?redirect=true"))
                localStorage.setItem('opened-url', this.router.url);

            this.router.navigateByUrl(pageUrl);
        }
    }

    public showConfirm(titleName = '') {
        this.simpleModalService.addModal(AppConfirmComponent, {
            title: titleName == '' ? 'Confirm title' : titleName,
            message: true
        }).subscribe((isConfirmed) => {
        });
    }

}
