import {Component, inject, Input} from '@angular/core';
import {FragmentData} from "../../../../../../../@core/models";
import {SaveData} from "../../../../../../../@core/services";

@Component({
    selector: 'mobile-fragment-characters',
    templateUrl: './mobile-fragment-characters.component.html',
    styleUrls: ['./mobile-fragment-characters.component.scss']
})
export class MobileFragmentCharactersComponent{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    saveData = inject(SaveData);

}

