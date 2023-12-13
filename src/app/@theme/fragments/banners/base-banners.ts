import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Injector,
    Input,
    OnInit,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {BannersService} from "../../../@core/services/api/banners.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {FragmentData} from "../../../@core/models";

@Directive()
export abstract class BaseBanners implements OnInit {
    bannerElements:Array<HTMLElement> = [];
    @Input('fragmentConfig') fragmentConfig: FragmentData;
    banners: any[] = [];

    bannerService: BannersService;
    router: Router;
    public currentSlide = 0;
    @ViewChild('slickCarousel', {static:true}) slickCarousel;
    private cd:ChangeDetectorRef;
    private elementRef:ElementRef;

    protected constructor(protected injector: Injector) {
        this.bannerService = injector.get(BannersService);
        this.router = injector.get(Router);
        this.cd = injector.get(ChangeDetectorRef);
        this.elementRef = injector.get(ElementRef);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fragmentConfig.firstChange) {
            // this.fragmentConfig.Config.autoplay = true;
            this.fragmentConfig.Config.direction = changes.fragmentConfig.currentValue.Config.rtl ? 'rtl' : 'ltr';
            this.fragmentConfig.Config.width = changes.fragmentConfig.currentValue.Config.width ? changes.fragmentConfig.currentValue.Config.width + 'px' : '100%';
        }
    }

    ngOnInit() {
        this.getBanners();
    }

    getBanners() {
        this.bannerService.getBanners(this.fragmentConfig.Id).pipe(take(1)).subscribe(banners => {
            if (this.fragmentConfig.Config.type == 'slider')
            {

            }
            this.banners = banners.map(banner =>
            {
                banner.src = this.bannerService.bannersPath + banner.Image;
                if(banner.hasOwnProperty('ImageSizes') && banner.ImageSizes.length)
                {
                    banner.sources = [];
                    banner.ImageSizes.forEach(size => {
                        const data = banner.Image.split('.');
                        const minWidth = size.split('-')[1];
                        banner.sources.push({
                            srcset:this.bannerService.bannersPath + data[0] + '-' + size + '.' + data[1],
                            media:`(max-width:${minWidth}px)`
                        });
                    });
                }
                return banner;
            });
            this.cd.detectChanges();
            this.setGap();
        });
    }

    abstract onLoginOpen();

    abstract onRegisterOpen();

    navigateByBanner(url: string, event?)
    {
        if(event && event.target.classList.contains('slick-arrow') || event.target.id.startsWith('slick-slide-control'))
            return;

        if (url !== '') {
            if (url.includes('http')) {
                window.open(url, '_blank');
            } else {
                this.router.navigateByUrl(url);
            }
        }
    }

    error()
    {

    }

    setGap()
    {
        const hostElement = this.elementRef.nativeElement;
        this.bannerElements = hostElement.querySelectorAll('[data-slick-index]');
        this.bannerElements.forEach(element => {
            element.style.display = "grid";

            if(this.fragmentConfig.Config.gap)
            {
                const gap = this.fragmentConfig.Config.gap + "px";
                element.style.gap = gap;
                element.style.marginLeft = gap;
                element.style.marginRight = gap;
            }
        });
    }
}
