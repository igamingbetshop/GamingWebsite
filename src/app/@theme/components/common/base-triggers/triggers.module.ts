import {ComponentFactory, ComponentFactoryResolver, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BaseTriggersComponent} from "./base-triggers.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoaderModule} from "../../../../projects/CraftBet/src/components/common/loader/loader.module";
@NgModule({
    declarations:[BaseTriggersComponent],
    exports:[BaseTriggersComponent],
    entryComponents:[BaseTriggersComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule,
        LoaderModule
    ]
})

export class TriggersModule
{
    constructor(private componentFactoryResolver: ComponentFactoryResolver)
    {

    }
    public resolveComponent(): ComponentFactory<BaseTriggersComponent>
    {
        return this.componentFactoryResolver.resolveComponentFactory(BaseTriggersComponent);
    }
}
