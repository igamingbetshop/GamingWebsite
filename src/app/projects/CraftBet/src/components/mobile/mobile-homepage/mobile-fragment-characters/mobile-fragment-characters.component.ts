import {Component, Injector, Input, OnInit} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {FragmentData} from "../../../../../../../@core/models";
import {SaveData} from "../../../../../../../@core/services";

@Component({
    selector: 'mobile-fragment-characters',
    templateUrl: './mobile-fragment-characters.component.html',
    styleUrls: ['./mobile-fragment-characters.component.scss']
})
export class MobileFragmentCharactersComponent implements OnInit{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    public saveData: SaveData;

    constructor(protected injector: Injector, private simpleModalService: SimpleModalService) {
        this.saveData = injector.get(SaveData);
    }

    ngOnInit() {
    }

}

