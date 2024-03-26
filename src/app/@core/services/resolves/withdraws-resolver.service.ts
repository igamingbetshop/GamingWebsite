
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {
    ConfigService,
    LocalStorageService,
    PaymentsService
} from "@core/services";
import {PaymentControllerService} from "@core/services/app/paymentController.services";
import {UserLogined} from "@core/services/app/userLogined.service";

@Injectable()
export class WithdrawsResolver  {
    public userData: any;

    constructor(public paymentControllerService: PaymentControllerService, public paymentsService: PaymentsService,
                public userLogined: UserLogined,
                public localStorageService: LocalStorageService,
                public configService: ConfigService) {
        this.userData = localStorageService.get('user');
    }

    resolve() {
        const data = {
            PartnerId: this.configService.defaultOptions.PartnerId,
            ClientId: this.userLogined.isAuthenticated ? this.userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };

        return this.paymentsService.getPaymentSystem(data).then((data: any) => {
            if (data['ResponseCode'] === 0) {
                return data['PartnerPaymentSystems'].filter(item => item.Type == '1');
            }
        });
    }
}
