import {Component, Injector} from '@angular/core';
import {BaseCategoryBox} from "../../../common/casino/base-category-box";
import {CasinoCategoryModule} from "../category/casino-category.module";
import {FragmentSource} from "@core/enums";


@Component({
    selector: 'category-box',
    templateUrl: './category-box.component.html',
    styleUrls: ['./category-box.component.scss'],
    imports: [
        CasinoCategoryModule,
    ],
    standalone: true
})
export class CategoryBoxComponent extends BaseCategoryBox
{
    constructor(protected injector:Injector)
    {
        super(injector);
    }

    ngOnInit()
    {
        this.fragmentKey = FragmentSource.Web;
        super.ngOnInit();
    }

}
