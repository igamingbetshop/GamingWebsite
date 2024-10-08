import {
  AfterViewInit,
  Component,
  createNgModule,
  HostBinding,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BaseDefaultSportComponent} from "../../../../../../@theme/components/common/base-default-sport/base-default-sport.component";
import {ConfigService} from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mobile-default-sport',
  templateUrl: './mobile-default-sport.component.html',
})
export class MobileDefaultSportComponent extends BaseDefaultSportComponent implements AfterViewInit
{

  isMigrated:boolean;

  @HostBinding('style.min-height') minHeight = this.layoutService.layoutStyle['min-height'];

  @ViewChild('sportComponentRef', { read: ViewContainerRef }) sportComponentRef;
  @ViewChild('frameComponentRef', { read: ViewContainerRef }) frameComponentRef;


  constructor(public injector: Injector,
              public layoutService:LayoutService,
              public configService:ConfigService,
              private route:ActivatedRoute,
              ) {
    super(injector);
  }

  ngOnInit() {
    this.isMigrated =
        this.configService.defaultOptions.SportOpenMode &&
        this.configService.defaultOptions.SportOpenMode === 'migrated' &&
        this.route.snapshot.data.position != 'asianweb';
    super.ngOnInit();
  }

  private async renderLazyLoadComponents()
  {
    if(this.isMigrated)
    {
      const { MobileSportModule } = await import("../mobile-sport/mobile-sport.module");
      const moduleRef = createNgModule(MobileSportModule, this.injector);
      const component = moduleRef.instance.getComponent();
      this.sportComponentRef.createComponent(component, {ngModuleRef: moduleRef});

    }
    else
    {
      const { MobileFullWindowModule } = await import("../mobile-full-window/mobile-full-window.module");
      const moduleRef = createNgModule(MobileFullWindowModule, this.injector);
      const component = moduleRef.instance.getComponent();
      const frameComponent = this.frameComponentRef.createComponent(component, {ngModuleRef: moduleRef});
      frameComponent.instance.routeData = this.route.snapshot.data;
    }
  }

  ngAfterViewInit()
  {
      this.renderLazyLoadComponents();
  }

}
