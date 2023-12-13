import {Directive, Injector, OnInit} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService, LocalStorageService, PaymentsService} from "../../../../@core/services";
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {UtilityService} from "../../../../@core/services/app/utility.service";
import {UserLogined} from "../../../../@core/services/app/userLogined.service";
import {Controllers, Methods} from "../../../../@core/enums";

@Directive()
export class BasePay3000 extends BaseComponent implements OnInit {
    private fb: FormBuilder;
    private localStorageService: LocalStorageService;
    private translate: TranslateService;
    private datePipe: DatePipe;
    private paymentsService: PaymentsService;
    private baseApiService: BaseApiService;
    private utilityService: UtilityService;
    private userLogined: UserLogined;
    private configService: ConfigService;

    formGroup: FormGroup;
    connected = false;
    public currencySymbol: any;
    public userData: any;
    public messageBalanceKey;
    public messageDateKey;
    public statusMessage: string;
    public paymentSystemId;
    public playerDetails: any;
    public states = [];

    constructor(public injector: Injector) {
        super(injector);
        this.fb = injector.get(FormBuilder);
        this.baseApiService = injector.get(BaseApiService);
        this.utilityService = injector.get(UtilityService);
        this.translate = injector.get(TranslateService);
        this.userLogined = injector.get(UserLogined);
        this.configService = injector.get(ConfigService);
        this.paymentsService = injector.get(PaymentsService);
        this.datePipe = injector.get(DatePipe);
        this.localStorageService = injector.get(LocalStorageService);
        this.userData = this.localStorageService.get('user');
        this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
    }

    ngOnInit(): void {
        this.getClientPaymentInfoStates();
        this.getData();
        this.formGroup = this.fb.group({
            'WalletNumber': ['', [
                Validators.required
            ]],
            'AcceptTerms': [false, [
                Validators.requiredTrue
            ]]
        });
    }

    savePay3000() {
        const req = this.formGroup.getRawValue();
        if (this.formGroup.valid) {
            delete req.AcceptTerms;
            req.Type = 'Wallet'; // to delete
            req.PaymentSystemId = this.paymentSystemId;
            console.log(req);
            this.baseApiService.apiRequest(req, Controllers.CLIENT, Methods.ADD_WALLET_NUMBER).subscribe((data) => {
                if (data['ResponseCode'] == 0) {
                    this.playerDetails = data.ResponseObject;
                    this.playerDetails.StateName = this.states.find((state) => state.Value === this.playerDetails?.State)?.Name;
                    this.connected = true;
                } else {
                    this.utilityService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
                }
            });
        }
    }

    getData() {
        const inputData = {
            PartnerId: this.configService.defaultOptions.PartnerId,
            ClientId: this.userLogined.isAuthenticated ? this.userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };
        this.paymentsService.getPaymentSystem(inputData).then((data) => {
            if (data['ResponseCode'] === 0) {
                data['PartnerPaymentSystems'].filter((item) => {
                    if (item.PaymentSystemId == 246) {
                        this.paymentSystemId = item.PaymentSystemId;
                        this.getClientPaymentMethods(item.PaymentSystemId);
                    }
                });
            }
        });
    }

    getClientPaymentMethods(paymentSystemId) {
        this.baseApiService.apiRequest(paymentSystemId, Controllers.CLIENT, Methods.GET_CLIENT_WALLETS).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                if (data.ResponseObject[0]) {
                    this.playerDetails = data.ResponseObject[0];
                    this.playerDetails.StateName = this.states.find((state) => state.Value === this.playerDetails?.State)?.Name;
                    this.translate.get('Settings.Player-Account-Date').subscribe((res: string) => {
                        const currentValue2 = this.playerDetails?.CardExpireDate;
                        const formattedDate = this.datePipe.transform(currentValue2, 'd.MM.yyyy');
                        this.messageDateKey = res.replace('value', formattedDate);
                    });
                    this.connected = true;
                }
            }
        });
    }

    getClientPaymentInfoStates() {
        this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_CLIENT_PAYMENT_INFO_STATES).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.states = data.ResponseObject;
            }
        });
    }

    deleteBinding() {
        const player = {
            Id: this.playerDetails.Id
        };
        this.baseApiService.apiRequest(player , Controllers.CLIENT, Methods.REMOVE_PAYMENT_WALLETS).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.connected = false;
            } else {
                this.utilityService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
            }
        });
    }
}