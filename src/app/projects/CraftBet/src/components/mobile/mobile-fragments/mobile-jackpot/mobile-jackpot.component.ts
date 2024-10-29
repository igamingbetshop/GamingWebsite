import {Component, createNgModule, inject} from '@angular/core';
import {BaseJackpot} from "../../../../../../../@theme/fragments/jackpot/base-jackpot";
import {MatDialog} from "@angular/material/dialog";
import {ConfigService} from "@core/services";

@Component({
    selector: 'mobile-jackpot',
    templateUrl: './mobile-jackpot.component.html',
    styleUrls: ['./mobile-jackpot.component.scss']
})
export class MobileJackpotComponent extends BaseJackpot
{
    partnerName: string;
    currencySymbol: string;
    dialog = inject(MatDialog);
    #config = inject(ConfigService);

    async loadComponent():Promise<any>
    {
        const {MobileJackpotWinnerModule} = await import('../mobile-jackpot-winner/mobile-jackpot-winner.module');
        const moduleRef = createNgModule(MobileJackpotWinnerModule);
        const component = moduleRef.instance.getComponent();
        return component;
    }

    openWinnerPopup()
    {
        this.loadComponent().then(component => {
            const dialogRef =  this.dialog.open(component, {data:{title: 'MobileJackpotWinner',
                    message: true}, hasBackdrop:false, scrollStrategy: this.overlay.scrollStrategies.block()});
            dialogRef.afterClosed().subscribe(result => {

            });
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.partnerName = this.#config.defaultOptions.PartnerName;
        this.currencySymbol = this.#config.defaultOptions.CurrencySymbol;
    }
}

