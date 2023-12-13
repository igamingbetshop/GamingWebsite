import {Component, Injector} from "@angular/core";
import {BaseEmailVerifyComponent} from "../../../../../../@theme/components/common/base-email-verify/base-email-verify.component";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'mobile-email-verify',
  templateUrl: "mobile-email-verify.component.html",
  styleUrls:["mobile-email-verify.component.scss"]
})

export class  MobileEmailVerifyComponent extends BaseEmailVerifyComponent
{
  constructor(injector:Injector, public layoutService:LayoutService)
  {
    super(injector);
  }
}
