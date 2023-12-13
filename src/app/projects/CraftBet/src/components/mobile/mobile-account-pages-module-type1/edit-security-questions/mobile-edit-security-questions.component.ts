import { Component, Injector } from '@angular/core';
import { LayoutService } from '../../../../../../../@core/services/app/layout.service';
import { BaseEditSecurityQuestions } from '../../../../../../../@theme/components/profile/edit-security-questions/base-edit-security-questions';

@Component({
  selector: 'app-edit-security-questions',
  templateUrl: './mobile-edit-security-questions.component.html',
  styleUrls: ['./mobile-edit-security-questions.component.scss']
})
export class EditSecurityQuestionsComponent extends BaseEditSecurityQuestions {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

}
