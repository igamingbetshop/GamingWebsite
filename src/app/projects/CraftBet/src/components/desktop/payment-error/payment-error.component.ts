import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@core/services';

@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.scss']
})
export class PaymentErrorComponent implements OnInit {

  constructor(private router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
  }

  redirectToPayment() {
    let url = '/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/deposit';
    this.router.navigate([url]);
  }

}
