import {ChangeDetectorRef, Directive, ElementRef, Injector, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {Controllers, Methods} from "../../../../@core/enums";
import {take} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Directive()
export class BaseSecurityQuestions  implements OnInit, OnDestroy
{
    answers:any[] = [];
    questions:any[] = [];
    selectedQuestionId = 1;
    answerModel:string;

    @ViewChild('questionsRef') questionsRef:ElementRef;
    @Input('formGroup') formGroup:FormGroup;

    private baseApiService:BaseApiService;
    private changeDetector : ChangeDetectorRef;
    public router: Router;

    constructor(protected injector: Injector)
    {
        this.baseApiService = injector.get(BaseApiService);
        this.changeDetector = injector.get(ChangeDetectorRef);
        this.router = injector.get(Router);
    }

    ngOnInit()
    {
        this.baseApiService.apiRequest(null, Controllers.MAIN, Methods.GET_SECURITY_QUESTIONS, false).pipe(take(1)).subscribe(data => {
            this.questions = data.ResponseObject;
            this.updateState();
        });
        let storedAnswers:any = sessionStorage.getItem('security-answers');
        if(storedAnswers)
        {
            this.answers = JSON.parse(storedAnswers);
            this.updateState();
        }
    }

    selectQuestion(event)
    {
        this.selectedQuestionId = Number(event.target.value);
    }

    trimAnswerData()
    {
        this.answerModel = this.answerModel.trim();
    }

    addAnswer()
    {
        const index = this.answers.findIndex(el => el.Id === this.selectedQuestionId);

        if(index > -1)
        {
            this.answers[index].AnswerText = this.answerModel;
        }
        else
        {
            const questionText = this.questions.find(q =>  q.Id === this.selectedQuestionId).QuestionText;
            this.answers.push({Id:this.selectedQuestionId, AnswerText:this.answerModel, QuestionText:questionText});
        }

        this.updateState();
        this.answerModel = ''
        this.questionsRef.nativeElement.value = this.questions.find(q => !q.hidden).Id;
        this.selectedQuestionId =  Number(this.questionsRef.nativeElement.value);
    }

    removeAnswer(id:number)
    {
        const index = this.answers.findIndex(el => el.Id === id);
        if(index > -1)
            this.answers.splice(index, 1);
        this.updateState();
        this.changeDetector.detectChanges();
        this.questionsRef.nativeElement.value = this.questions.find(q => !q.hidden).Id;
        this.selectedQuestionId =  Number(this.questionsRef.nativeElement.value);
    }

    ngOnDestroy()
    {
        if(this.answers.length > 0)
        {
            sessionStorage.setItem('security-answers', JSON.stringify(this.answers));
        }

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
        this.formGroup.get('SecurityQuestions').setValue(JSON.stringify(state.value));
        this.formGroup.get('SecurityQuestions').setErrors(state.valid ? null : {'incorrect' : true});
    }
}
