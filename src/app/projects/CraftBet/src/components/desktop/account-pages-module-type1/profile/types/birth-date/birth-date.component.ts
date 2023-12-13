import {Component, Input} from "@angular/core";
import {BaseBirthDate} from "../../../../../../../../../@theme/components/profile/types/birth-date/base-birth-date";

@Component({
    selector:'birth-date',
    templateUrl:'birth-date.component.html',
    styleUrls:['birth-date.component.scss']
})

export class BirthDateComponent extends BaseBirthDate
{

}