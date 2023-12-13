import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {
    ConfigService,
    LocalStorageService,
    PaymentsService
} from "@core/services";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BetsService} from "@core/services/app/bets.services";
import {PaymentControllerService} from "@core/services/app/paymentController.services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {format} from "date-fns";

@Injectable()
export class ActiveWithdrawsResolver implements Resolve<Observable<any>> {
    public userData: any;

    constructor(public paymentControllerService: PaymentControllerService, public paymentsService: PaymentsService,
                public userLogined: UserLogined,
                public localStorageService: LocalStorageService,
                public configService: ConfigService,
                public betsService: BetsService,
                public getPaymentsService: GetPaymentsService) {
        this.userData = localStorageService.get('user');
    }

    resolve() {
        let d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        let yearAgo = format(d,'yyyy-MM-dd HH:mm');

        let cDate = new Date();
        cDate.setDate(new Date().getDate()+1);
        let currentDate = format(d,'yyyy-MM-dd HH:mm');


        const input = {
            createdFrom: yearAgo,
            createdBefore: currentDate,
            status: [1, 3, 4, 5, 7],
            type: 1,
            page: 0,
            takeCount: 10
        };

        return this.getPaymentsService.getPaymentHistoryListByPromiss(input).then((responseData: any) => {
            if (responseData['ResponseCode'] === 0) {
                return responseData['PaymentRequests'];
            }
        })
    }
}
