import {
  Component,
  createNgModule,
  ElementRef,
  Injector,
  NgModuleRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";
import {Location} from "@angular/common";
import {BaseForgotPasswordComponent} from "../../../../../../@theme/components/common/base-forgot-password/base-forgot-password.component";
import {MobileOpenTicketComponent} from "../mobile-open-ticket/mobile-open-ticket.component";

@Component({
  selector: 'app-mobile-forgot-password',
  templateUrl: './mobile-forgot-password.component.html',
  styleUrls: ['./mobile-forgot-password.component.scss']
})
export class MobileForgotPasswordComponent extends BaseForgotPasswordComponent {
  public bgUrl: string = '';
  public logoUrl: string = '../../../../../../../assets/images/' + window.location.hostname + '.png';
  location: Location;
  @ViewChild('inputElement') public inputElement: ElementRef;

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
    this.location = injector.get(Location);
  }

  errorHandlerBg(event) {
    event.target.src = '../../../../../../../assets/images/register/mobile_background.png';
  }

  async changeStep(step:number)
  {
    super.changeStep(step);

    switch (step)
    {
      case 1:
        break;
      case 2:
        const p = setTimeout(() => {
          clearTimeout(p);
          this.changeStep(3);
          this.changeDetectionRef.detectChanges();
        }, 3000);
        break;
      case 3:
        const { VerifyCodeModule } = await import("../../../../../../@theme/components/modals/verify-code/verify-code.module");
        const moduleRef = createNgModule(VerifyCodeModule, this.injector);
        this.createComponentWithInstances(moduleRef, this.verifyOtpRef, this.getRecoveryType(), this.forgotPasswordForm.get("fEmail").value.toString());
        break;
      case 4:
        break;
      case 5:
        break;
    }
  }

  private createComponentWithInstances(moduleRef: NgModuleRef<any>, containerRef: ViewContainerRef, type: string, targetOfSender: string = '')
  {
    const component = moduleRef.instance.getComponent();
    const componentRef:any = containerRef.createComponent(component, {ngModuleRef: moduleRef});
    componentRef.instance.type = type;
    componentRef.instance.targetOfSender = targetOfSender;
    componentRef.instance.verificationCodeType = this.verificationCodeType;
    componentRef.instance.activePeriodInMinutes = this.activePeriodInMinutes;
    componentRef.instance.onVerified.subscribe(val => {
      this.onVerified(val);
    });
  }

  private onVerified(data)
  {
    this.securityQuestionIds = data.questionIds;
    this.showQuestionsView = !!this.securityQuestionIds.length;
    this.otp = data.code;
    if(this.showQuestionsView)
    {
      this.getSecurityQuestions();
    }
    const p = setTimeout(() => {
      clearTimeout(p);
      this.changeStep(4);
    }, 1000);
  }

  public openNotLoginNewTicket(event:MouseEvent, component:any = null)
  {
    super.openNotLoginNewTicket(event, MobileOpenTicketComponent);
  }
}
