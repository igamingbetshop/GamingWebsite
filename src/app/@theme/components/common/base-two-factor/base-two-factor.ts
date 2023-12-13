import {createNgModuleRef, Directive, EventEmitter, Injector, OnInit} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {ProfileService} from "../../profile/service/profile.service";
import {SimpleModalService} from "ngx-simple-modal";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {UtilityService} from "../../../../@core/services/app/utility.service";
import {Controllers, Methods} from "../../../../@core/enums";
import {take} from "rxjs";


@Directive()
export class BaseTwoFactor extends BaseComponent implements OnInit {
    public profileService: ProfileService;
    public simpleModalService: SimpleModalService;
    public baseApiService: BaseApiService;
    public utilityService: UtilityService;

    public IsTwoFactorEnabled;
    public profileData;
    public qrData: any = { Data: '', Key: '' };
    public twoFactorCode: string;
    public disableTwoFactorCode: any;
    public isCodeValid = false;
    public validatedCode: string;
    public errorMessage: string;
    public qrCodeImageSrc;
    public _qrCodeWidth = 153;
    public _qrCodeHeight = 145;

    constructor(public injector: Injector) {
        super(injector);
        this.baseApiService = injector.get(BaseApiService);
        this.utilityService = injector.get(UtilityService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.profileService = injector.get(ProfileService);
        this.profileService.getClientInfo();
        this.profileService.profileData$.subscribe((data) => {
            this.profileData = data;
            this.IsTwoFactorEnabled = this.profileData?.IsTwoFactorEnabled;
        });
    }

    ngOnInit(): void {
        this.viewGenerateQRCode();
    }

    viewGenerateQRCode() {
        this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GENERATE_QR_CODE).pipe(take(1)).subscribe((data) => {
            if (data.ResponseCode === 0) {
                this.qrData = data.ResponseObject;
                this.qrCodeImageSrc = `https://chart.apis.google.com/chart?chs=${this._qrCodeWidth}x${this._qrCodeHeight}&chld=M|0&cht=qr&chl=${this.qrData.Data}`;
            }
        });
    }

    enableAuthentication() {
        const enabled = {
            QRCode: this.qrData.Key,
            Pin: this.twoFactorCode
        };
        this.baseApiService.apiRequest(enabled, Controllers.CLIENT, Methods.ENABLE_CLIENT_TWO_FACTOR).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.IsTwoFactorEnabled = true;
                this.twoFactorCode = '';
            } else {
                this.utilityService.showMessageWithDelay(this, [{ 'errorMessage': data['Description'] }]);
            }
        });

    }

    async disableAuthentication() {
        const { GoogleAuthenticateModule } = await import('../../modals/google-authenticate/google-authenticate.module');
        const moduleRef = createNgModuleRef(GoogleAuthenticateModule);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            this.disableTwoFactorCode = data.code;
            this.baseApiService.apiRequest(String(this.disableTwoFactorCode), Controllers.CLIENT, Methods.DISABLE_CLIENT_TWO_FACTOR).subscribe((res) => {
                if (res['ResponseCode'] == 0) {
                    data.callBack({});
                    this.IsTwoFactorEnabled = false;
                    this.viewGenerateQRCode();
                } else {
                    data.callBack({ error: res['Description'] });
                }
            });
        });
        this.simpleModalService.addModal(component, {
            error: this.errorMessage,
            onVerified: callback,
            prefixTitle: 'Disable-authentication'
        }).subscribe(data => {
        });
    }

    onInput(event) {
        const input = <HTMLInputElement>event.target;
        let value = input.value;
        value = value.replace(/\D/g, '');
        if (value.length > 0 && isNaN(parseInt(value[0]))) {
            input.value = '';
        } else {
            input.value = value;
            this.twoFactorCode = value;
        }
        this.validateTwoFactorCode();
    }

    preventKeys(event: KeyboardEvent) {
        const key = event.key;
        if (key === '+' || key === '-' || key === '.') {
            event.preventDefault();
        }
    }

    isMaxReached() {
        return +this.twoFactorCode > 999999;
    }

    validateTwoFactorCode() {
        this.isCodeValid = this.twoFactorCode.length === 6;
    }

}
