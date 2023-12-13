import {Component, createNgModuleRef, Injector, OnInit} from '@angular/core';
import { BaseCasino } from '../../common/casino/base-casino.component';
import { FragmentSource } from '../../../../../../@core/enums';
import {MobileLuckyGameModule} from "./mobile-lucky-game/mobile-lucky-game.module";
import {CasinoProvidersService} from "../../desktop/app-casino/providers/casino-providers.service";

@Component({
    selector: 'app-mobile-casino',
    templateUrl: './mobile-casino.component.html',
    styleUrls: ['./mobile-casino.component.scss'],
    providers:[CasinoProvidersService]
})
export class MobileCasinoComponent extends BaseCasino implements OnInit{

    constructor(
        protected injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fragmentKey = FragmentSource.Mobile;
        super.ngOnInit();
    }
    async loadComponent():Promise<any>
    {
        const {MobileLuckyGameModule} = await import('../mobile-casino/mobile-lucky-game/mobile-lucky-game.module');
        const moduleRef = createNgModuleRef(MobileLuckyGameModule, this.injector);
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
