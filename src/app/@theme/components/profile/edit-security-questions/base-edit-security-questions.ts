import {
    ChangeDetectorRef,
    createNgModuleRef,
    Directive,
    ElementRef,
    EventEmitter,
    Injector,
    OnDestroy,
    OnInit,
    ViewChild
} from "@angular/core";
import {SimpleModalService} from "ngx-simple-modal";
import {VerificationService} from "../../../../@core/services/api/verification.service";
import {ProfileService} from "../service/profile.service";
import {Subscription, take} from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {Controllers, Methods, VerificationCodeTypes} from "../../../../@core/enums";
import {UtilityService} from "../../../../@core/services/app/utility.service";

@Directive()
export class BaseEditSecurityQuestions implements OnInit, OnDestroy
{
    securityQuestionIds:number[] = [];
    securityQuestions:any[] = [];

    answers:any[] = [];
    questions:any[] = [];
    questionsReference:any[] = [];
    questionsBackup:any[] = [];
    selectedQuestionId = 1;
    activePeriodInMinutes:number;
    disableButtons :boolean = false;
    errorMessage;
    successMessage:string;

    public step:number = 1;
    private otp:string;
    @ViewChild('questionsRef') questionsRef:ElementRef;


    private profileService: ProfileService;
    private simpleModalService: SimpleModalService;
    private verificationService: VerificationService;
    private baseApiService:BaseApiService;
    private utilityService: UtilityService;
    private changeDetector: ChangeDetectorRef;

    constructor(protected injector:Injector)
    {
        this.profileService = injector.get(ProfileService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.verificationService = injector.get(VerificationService);
        this.baseApiService = injector.get(BaseApiService);
        this.utilityService = injector.get(UtilityService);
        this.changeDetector = injector.get(ChangeDetectorRef);
    }

    ngOnInit()
    {
        const sub = new Subscription();
        sub.add(this.profileService.profileData$.subscribe(data => {
            if(data)
            {
                sub.unsubscribe();
                this.securityQuestionIds = data.SecurityQuestions;
                this.getSecurityQuestions();
            }
        }));
       this.profileService.getClientInfo();
    }

    ngOnDestroy()
    {

    }

    changeStep(step:number = 0)
    {
        this.step = step;

        switch (this.step)
        {
            case 2:
                break;
            case 3:
                break;
        }
    }

    getSecurityQuestions()
    {
        this.baseApiService.apiRequest(null, Controllers.MAIN, Methods.GET_SECURITY_QUESTIONS, false).pipe(take(1)).subscribe(data => {
            this.questions = data.ResponseObject;
            this.questionsReference = data.ResponseObject;
            this.securityQuestions = data.ResponseObject.filter(el => {
                return this.securityQuestionIds.includes(el.Id);
            });
            this.questionsBackup = [...this.securityQuestions];
        });
    }
    removeQuestion(id: number)
    {
        const index = this.securityQuestions.findIndex(el => el.Id === id);
        if(index > -1)
            this.securityQuestions.splice(index, 1);
        this.questions = this.questionsReference.filter(el => {
            const findingId = this.securityQuestions.find(security => el.Id === security.Id)?.Id;
            return el.Id !== findingId;
        });
        this.changeDetector.detectChanges();
        this.questionsRef.nativeElement.value = this.questions.find(q => !q.hidden)?.Id;
        this.selectedQuestionId =  Number(this.questionsRef.nativeElement.value);
    }

    selectQuestion(event)
    {
        this.selectedQuestionId = Number(event.target.value);
    }

    removeAnswer(id:number)
    {
        const index = this.answers.findIndex(el => el.Id === id);
        if(index > -1)
            this.answers.splice(index, 1);
        this.updateState();
        this.disableButtons = false;
        this.changeDetector.detectChanges();
        this.questionsRef.nativeElement.value = this.questions.find(q => !q.hidden)?.Id;
        this.selectedQuestionId =  Number(this.questionsRef.nativeElement.value);
    }

    addAnswer(answerElement: HTMLInputElement)
    {
        const answer = answerElement.value;
        if(!answer)
            return;
        const index = this.answers.findIndex(el => el.Id === this.selectedQuestionId);

        if(index > -1)
        {
            this.answers[index].AnswerText = answer;
        }
        else
        {
            const questionText = this.questions.find(q =>  q.Id === this.selectedQuestionId)?.QuestionText;
            const questionText2 = this.questionsReference.find(q =>  q.Id === this.selectedQuestionId)?.QuestionText;
            this.answers.push({Id:this.selectedQuestionId, AnswerText:answer, QuestionText:questionText ? questionText : questionText2});
        }
        this.updateState();
        answerElement.value = '';
        this.questionsRef.nativeElement.value = this.questions.find(q => !q.hidden).Id;
        this.selectedQuestionId =  Number(this.questionsRef.nativeElement.value);
    }

    private updateState()
    {
        const state:any = {};
        state.valid = this.answers.length >= 3;
        state.value = this.answers.map(el => {
            const mapped:any = {};
            mapped.Id = el.Id;
            mapped.Answer = el.AnswerText;
            return mapped;
        });
        this.questions.forEach(q => {
            const a = this.answers.find(a => a.Id === q.Id);
            q.hidden = a;
        });
        this.disableButtons = true;
    }

    updateData()
    {
        const state:any = {};
        state.valid = this.answers.length + this.securityQuestions.length >= 3;
        state.value = this.answers.map(el => {
            const mapped:any = {};
            mapped.Id = el.Id;
            mapped.Answer = el.AnswerText;
            return mapped;
        });
        const mappedData = this.securityQuestions.map((el) => {
            let a:any = {};
            a.Id = el.Id;
            a.Answer = '';
            return a;
        });
        if (state.value.length < 3) {
            state.value = [...state.value, ...mappedData ];
        }
        if(state.valid)
        {
            const req = {
                SecurityQuestions:state.value,
                SMSCode:this.otp
            }
            this.baseApiService.apiRequest(req, Controllers.CLIENT, Methods.UPDATE_SECURITY_QUESTIONS).subscribe((data) => {
                if (data['ResponseCode'] === 0)
                {
                    this.disableButtons = false;
                    // this.changeStep(3);
                    this.utilityService.showMessageWithDelay(this, [{'successMessage': "success"}]);
                } else {
                    this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                }
            });
        }

    }

    cancel() {
        this.disableButtons = false;
        this.answers = [];
        this.securityQuestions = [...this.questionsBackup];
    }

    sendVerificationCode()
    {
        this.verificationService.getVerificationCode('mobile', VerificationCodeTypes.SecurityQuestionChangeByMobile).pipe(take(1)).subscribe((responseData) => {
            if (responseData['ResponseCode'] === 0)
            {
                this.activePeriodInMinutes = responseData.ResponseObject.ActivePeriodInMinutes;
                this.openVerifyCode('mobile', this.profileService.getProfile.MobileNumber);
            }
            else
            {
                this.utilityService.showMessageWithDelay(this, [{'errorMessage': responseData.Description}]);
            }
        });
    }
    async openVerifyCode(type, targetOfSource?)
    {
        const { VerifyCodeModule } = await import('../../modals/verify-code/verify-code.module');
        const moduleRef = createNgModuleRef(VerifyCodeModule);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            data.callBack({});
            this.otp = data.code;
            // this.changeStep(2);
            if (this.step === 1) {
                this.changeStep(2);
            } else {
                this.updateData();
            }
        });

        this.simpleModalService.addModal(component, {isModal:true, type:type, targetOfSender:targetOfSource, onVerified:callback, activePeriodInMinutes: this.activePeriodInMinutes, prefixTitle: 'Security', verificationCodeType:VerificationCodeTypes.SecurityQuestionChangeByMobile}).subscribe(data => {

        });
    }
}
