import {Component, createNgModule, inject} from '@angular/core';
import {BaseJackpot} from "../../../../../../../@theme/fragments/jackpot/base-jackpot";
import {MatDialog} from "@angular/material/dialog";
import {ConfigService} from "@core/services";

@Component({
    selector: 'jackpot',
    templateUrl: './jackpot.component.html',
    styleUrls: ['./jackpot.component.scss']
})
export class JackpotComponent extends BaseJackpot
{
    partnerName: string;
    currencySymbol: string;
    dialog = inject(MatDialog);
    #config = inject(ConfigService);

    async loadComponent():Promise<any>
    {
        const {JackpotWinnerModule} = await import('../jackpot-winner/jackpot-winner.module');
        const moduleRef = createNgModule(JackpotWinnerModule);
        const component = moduleRef.instance.getComponent();
        return component;
    }

    ngOnInit() {
        super.ngOnInit();
        this.partnerName = this.#config.defaultOptions.PartnerName;
        this.currencySymbol = this.#config.defaultOptions.CurrencySymbol;
    }

    openWinnerPopup()
    {
        this.loadComponent().then(component => {
            const dialogRef =  this.dialog.open(component, {data:{title: 'JackpotWinner',
                    message: true}, hasBackdrop:false, scrollStrategy: this.overlay.scrollStrategies.block()});
            dialogRef.afterClosed().subscribe(result => {

            });
        });
    }

}

