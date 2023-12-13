import {
  Component,
  createNgModuleRef,
  ElementRef,
  Injector,
  NgModuleRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BaseForgotPasswordComponent} from '../../../../../../@theme/components/common/base-forgot-password/base-forgot-password.component';
import {AppOpenTicketComponent} from "../app-open-ticket/app-open-ticket.component";

@Component({
  selector: 'app-app-forgot-password',
  templateUrl: './app-forgot-password.component.html',
  styleUrls: ['./app-forgot-password.component.scss']
})
export class AppForgotPasswordComponent extends BaseForgotPasswordComponent {
  @ViewChild('inputElement') public inputElement: ElementRef;
  public logoUrl: string = '';
  constructor(public injector: Injector) {
    super(injector);
  }

  errorHandler(event) {
    event.target.src = '../../../../../../../assets/images/logo.png';
  }

  async changeStep(step:number)
  {
    super.changeStep(step);

    switch (step)
    {
      case 1:
        this.showSuccessMessage = false;
        break;
      case 2:
        const p =  setTimeout(() => {
          clearTimeout(p);
          this.changeStep(3);
          this.changeDetectionRef.detectChanges();
        }, 3000);
        break;
      case 3:
        const { VerifyCodeModule } = await import("../../../../../../@theme/components/modals/verify-code/verify-code.module");
        const moduleRef = createNgModuleRef(VerifyCodeModule, this.injector);
        this.createComponentWithInstances(moduleRef, this.verifyOtpRef, this.getRecoveryType(), this.forgotPasswordForm.get("fEmail").value.toString());
        break;
      case 4:
        break;
      case 5:
        break;
    }
  }

  private createComponentWithInstances(moduleRef:NgModuleRef<any>, containerRef:ViewContainerRef, type:string, targetOfSender:string = '')
  {
    const backIconNode = document.createElement('i');
    backIconNode.classList.add('icon-arrow-to-left');
    backIconNode.addEventListener('click', this.changeStep.bind(this, 1));
    const component = moduleRef.instance.getComponent();
    const componentRef:any = containerRef.createComponent(component, {ngModuleRef: moduleRef,projectableNodes:[[backIconNode]]});
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
    super.openNotLoginNewTicket(event, AppOpenTicketComponent);
  }

}
