import {Component, EventEmitter, Input, Output} from "@angular/core";
import {BaseComponent} from "../../../../../../@theme/components/base/base.component";

@Component({
  selector: 'app-common-payment-nominals',
  templateUrl: './app-common-payment-nominals.component.html',
  styleUrls: ['./app-common-payment-nominals.component.scss']
})

export class AppCommonPaymentNominalsComponent extends BaseComponent
{

  @Input('nominals') nominals: number[] = [];
  @Output('nominalChange') nominalChange:EventEmitter<number> =  new EventEmitter<number>();

  selectedNominal:number;

  ngOnInit()
  {

  }

  changeNominal(nominal)
  {
    this.selectedNominal = nominal;
    this.nominalChange.emit(nominal);
  }

}
