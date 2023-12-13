import { Directive, Injector } from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {SimpleModalService} from "ngx-simple-modal";
import {SharedService} from "@core/services";
import {ProfileService} from "../../profile/service/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "@core/services/app/state.service";

@Directive()
export class BaseBankAccounts extends BaseComponent {
    public paymentService: GetPaymentsService;

    private simpleModalService: SimpleModalService;
    public sharedService: SharedService;
    public addBankAccount = false;
    public isEditMode = false;
    public selectedBankAccount;
    public profileData;
    public profileService: ProfileService;
    public router: Router;
    public route: ActivatedRoute;
    private stateService:StateService;

    constructor(public injector: Injector) {
        super(injector);
        this.paymentService = injector.get(GetPaymentsService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.sharedService = injector.get(SharedService);
        this.profileService = injector.get(ProfileService);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.stateService = injector.get(StateService);
    }

    public addAccount(addAccountComponent?)
    {
        this.simpleModalService.addModal(addAccountComponent, {
            title: 'Open ticket',
            message: true,
            data: {selectedBankAccount: this.selectedBankAccount}
        }, {closeOnClickOutside: true}).subscribe(() => {
        });
    }


    ngOnInit() {
        this.paymentService.getBankAccountTypes();
        this.paymentService.getBankAccounts();
        this.profileService.getClientInfo();
        this.profileService.profileData$.subscribe((data) => {
            this.profileData = data;
        });
    }

    openMenu() {
        this.sharedService.mobileRightSidebarOpen.next(true)
    }

    deleteBank(account)
    {
        this.stateService.openModal({label:'deleteBank', data:{accountId:account, paymentService:this.paymentService}});
    }

    editBank(account) {
        this.addBankAccount = true;
        this.isEditMode = true;
        this.selectedBankAccount = account;
    }
}
