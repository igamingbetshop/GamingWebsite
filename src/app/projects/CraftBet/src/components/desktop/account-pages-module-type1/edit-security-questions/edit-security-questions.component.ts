import {Component, Injector} from "@angular/core";
import {BaseEditSecurityQuestions} from "../../../../../../../@theme/components/profile/edit-security-questions/base-edit-security-questions";


@Component({
  selector: 'app-edit-security-questions',
  templateUrl: './edit-security-questions.component.html',
  styleUrls: ['./edit-security-questions.component.scss']
})
export class EditSecurityQuestionsComponent extends BaseEditSecurityQuestions{

  constructor(protected injector:Injector)
  {
    super(injector);
  }

}
