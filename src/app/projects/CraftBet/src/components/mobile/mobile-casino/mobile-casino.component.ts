import {Component, createNgModule, Injector, OnInit} from '@angular/core';
import { BaseCasino } from '../../common/casino/base-casino';
import { FragmentSource } from '../../../../../../@core/enums';
import {CasinoProvidersService} from "../../../../../../@theme/fragments/casino/providers/casino-providers.service";

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
        const moduleRef = createNgModule(MobileLuckyGameModule, this.injector);
        const component = moduleRef.instance.getComponent();
        return component;
    }
    openLuckyGame()
    {
        this.loadComponent().then(component => {
            const dialogRef = this.dialog.open(component, {data:{title: 'LuckyGame',
                    message: true}, hasBackdrop:true});
            dialogRef.afterClosed().subscribe(result => {
                if(result)
                    this.router.navigate(['/casino/all-games']);
            });
        });
    }
}
