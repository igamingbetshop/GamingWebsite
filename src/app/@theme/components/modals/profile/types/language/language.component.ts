import {Component} from '@angular/core';
import {BaseLanguage} from "../../../../profile/types/language/base-language";

@Component({
  selector: 'languages',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends BaseLanguage
{

}