import {Component, createNgModuleRef, Injector} from '@angular/core';
import {BaseCasino} from "../../common/casino/base-casino.component";
import {FragmentSource} from "../../../../../../@core/enums";
import {CasinoProvidersService} from "./providers/casino-providers.service";


@Component({
    selector: 'app-app-casino',
    templateUrl: './app-casino.component.html',
    styleUrls: ['./app-casino.component.scss'],
    providers:[CasinoProvidersService]
})
export class AppCasinoComponent extends BaseCasino
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
    async loadComponent():Promise<any>
    {
        const {LuckyGameModule} = await import('../app-casino/lucky-game/lucky-game.module');
        const moduleRef = createNgModuleRef(LuckyGameModule, this.injector);
        const component = moduleRef.instance.getComponent();
        return component;
    }

    openLuckyGame()
    {
        this.loadComponent().then(component => {
            this.simpleModalService.addModal(component, {
                title: 'LuckyGame',
                message: true,
                data: {},
            },{closeOnClickOutside: false}).subscribe(
                (result) => {

                    if(result)
                        this.router.navigate(['/casino/all-games']);
                });
        });
    }
}
