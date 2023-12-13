import {ComponentFactory, ComponentFactoryResolver, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BaseTriggersComponent} from "./base-triggers.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
@NgModule({
    declarations:[BaseTriggersComponent],
    exports:[BaseTriggersComponent],
    entryComponents:[BaseTriggersComponent],
    imports:[
        CommonModule,
        FontAwesomeModule,
        TranslateModule
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
