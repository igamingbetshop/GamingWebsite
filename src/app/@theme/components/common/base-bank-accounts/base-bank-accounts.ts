import {Directive, inject, Injector} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {SharedService} from "@core/services";
import {ProfileService} from "../../profile/service/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "@core/services/app/state.service";
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class BaseBankAccounts extends BaseComponent {
    public paymentService: GetPaymentsService;
    private dialog = inject(MatDialog);
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
        this.sharedService = injector.get(SharedService);
        this.profileService = injector.get(ProfileService);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.stateService = injector.get(StateService);
    }

    public addAccount(addAccountComponent?)
    {
        this.dialog.open(addAccountComponent, {
            data:{title: 'Open ticket', message: true, selectedBankAccount: this.selectedBankAccount},
            disableClose:true
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
