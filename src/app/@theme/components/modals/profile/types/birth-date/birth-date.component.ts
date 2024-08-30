import {Component, forwardRef} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseBirthDate} from "../../../../profile/types/birth-date/base-birth-date";

@Component({
    selector:'birth-date',
    templateUrl:'birth-date.component.html',
    styleUrls:['birth-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BirthDateComponent),
            multi: true
        }
    ]
})

export class BirthDateComponent extends BaseBirthDate
{

}