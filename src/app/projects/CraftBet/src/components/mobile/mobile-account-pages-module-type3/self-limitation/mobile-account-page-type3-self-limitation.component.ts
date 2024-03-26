import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { add, format } from 'date-fns';
import { take } from 'rxjs/operators';
import { encryptSelfExclusionData } from '../../../../../../../@core/utils';
import { CommonSettingsComponent } from '../../../common/common-settings/common-settings.component';
import { ConfirmWindowComponent } from '../../../../../../../@theme/components/common/confirm-window/confirm-window.component';
import { LogoutHelper } from '../../../../../../../@core/services/helpers/logout.helper';

@Component({
    selector: 'app-mobile-account-page-type3-self-limitation',
    templateUrl: './mobile-account-page-type3-self-limitation.component.html',
    styleUrls: ['./mobile-account-page-type3-self-limitation.component.scss']
})
export class MobileAccountPageType3SelfLimitationComponent extends CommonSettingsComponent {

    @ViewChild('amountLabel') amountLabel: ElementRef;
    public selfTypes = {
        AccountClosure: { name: 'AccountClosure' },
        SportsBettingLossLimit: { name: 'SportsBettingLossLimit' },
        SportsBettingLimit: { name: 'SportsBettingLimit' },
        AdditionalDepositLimit: { name: 'AdditionalDepositLimit' },
        SessionLimit: { name: 'SessionLimit' },
        MonthlyDepositLimit: { name: 'MonthlyDepositLimit' },
        SelfLock: { name: 'SelfLock' }
    };
    public setPassword = '';
    public setConfirmPassword = '';
    public clientStatuses: any = {};
    public success1 = '';
    public success2 = '';
    public success3 = '';
    public success4 = '';
    public error1 = '';
    public error2 = '';
    public error3 = '';
    public error4 = '';
    public error5 = '';
    public error6 = '';
    public selectedMonth;
    public months = [
        { Name: '1 month' },
        { Name: '3 month' },
        { Name: '6 month' },
        { Name: '12 month' },
        { Name: 'Permanently' }
    ];
    public allMonths = [
        { Name: '1 month' },
        { Name: '3 month' },
        { Name: '6 month' },
        { Name: '12 month' },
        { Name: 'Permanently' }
    ];
    public loading = false;
    public isOpen: boolean[] = [];
    public selectedForm;
    public depositMonthly;
    public showPercentage = false;
    public changePasswordType = false;
    public changePasswordAccountType = false;
    public twentyPercent;
    public openMoreLimits = false;
    public setDepositMonthlyLimit = false;
    public setLossLimit = false;
    public setDepositLimit = false;
    public sportBetsList = [
        { Id: 1, Name: 'Day' },
        { Id: 2, Name: 'Week' },
        { Id: 3, Name: 'Month' }
    ];
    public depositBetsList = [
        { Id: 1, Name: 'Day' },
        { Id: 2, Name: 'Week' },
    ];
    public selectedItem = 'Day';
    public currencySymbol;
    public totalLostChangeValue;
    private logoutHelper: LogoutHelper;
    public isShopWallet = false;
    public selectedAccount;

    constructor(public injector: Injector) {
        super(injector);
        this.logoutHelper = injector.get(LogoutHelper);
        this.currencyId = this.userData.CurrencyId;
        this.currencySymbol = this.userData.CurrencySymbol;
        this.selectedExclusionType = 'Temporary';
        this.selectedAccount = JSON.parse(localStorage.getItem('selectedAccountId'));
        if (this.selectedAccount.BetShopId !== null && this.selectedAccount.PaymentSystemId === null) {
            this.isShopWallet = true;
        }
        window.scroll(0,0);
    }

    closeAccount(form) {
        const dialogRef =  this.dialog.open(ConfirmWindowComponent,{data:{title: this.selectedExclusionType}});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                form.Credentials = encryptSelfExclusionData(this.setPassword);
                this.getSettingsInfoService.closeAccount(form).pipe(take(1)).subscribe(data => {
                    if (data.ResponseCode == 0) {
                        this.utilityService.showMessageWithDelay(this, [{ 'successMessage': 'Your account has been successfully blocked.' }]);
                        this.logoutHelper.logout(9);
                    } else {
                        if (data.Description) {
                            this.utilityService.showMessageWithDelay(this, [{ 'error6': data.Description }]);
                        } else {
                            this.utilityService.showMessageWithDelay(this, [{ 'error6': 'Error' }]);
                        }
                    }
                });
            }
        });
    }

    toggleContainer(index) {
        if (this.isOpen[index] === true) {
            this.isOpen[index] = false;
        } else {
            this.isOpen[index] = !this.isOpen[index];
            this.isOpen = this.isOpen.map((value, i) => i === index);
        }
        this.selectedItem = 'Day';
    }

    updateSelfLimitationEdited(formNumber: number) {
        this.loading = true;
        const values = this.limitForm.getRawValue();
        const stringValues = Object.keys(values).reduce((acc, key) => {
            const value = values[key];
            if (value !== null && value !== undefined) {
                const convertedValue = value;
                acc[key] = String(convertedValue);
            } else {
                acc[key] = null;
            }
            return acc;
        }, {});
        const updatedValues = {};
        if (formNumber === 1) {
            updatedValues['TotalLossLimitDaily'] = stringValues['TotalLossLimitDaily'];
            updatedValues['TotalLossLimitWeekly'] = stringValues['TotalLossLimitWeekly'];
            updatedValues['TotalLossLimitMonthly'] = stringValues['TotalLossLimitMonthly'];
            updatedValues['TotalBetAmountLimitDaily'] = stringValues['TotalBetAmountLimitDaily'];
            updatedValues['TotalBetAmountLimitWeekly'] = stringValues['TotalBetAmountLimitWeekly'];
            updatedValues['TotalBetAmountLimitMonthly'] = stringValues['TotalBetAmountLimitMonthly'];
        } else if (formNumber === 3) {
            updatedValues['DepositLimitDaily'] = stringValues['DepositLimitDaily'];
            updatedValues['DepositLimitWeekly'] = stringValues['DepositLimitWeekly'];
            updatedValues['DepositLimitMonthly'] = stringValues['DepositLimitMonthly'];
        } else if (formNumber === 4) {
            // updatedValues['SessionLimit'] = stringValues['SessionLimit'];
            updatedValues['DepositLimitMonthly'] = stringValues['DepositLimitMonthly'];
        }
        const stringLimits = {};
        for (const key in this.limits) {
            if (this.limits.hasOwnProperty(key)) {
                const value = this.limits[key];
                if (value !== null && !isNaN(value)) {
                    stringLimits[key] = String(value);
                }
            }
        }
        const mergedValues = {...stringLimits, ...updatedValues};
        const convertedMergedValues = {};
        for (const key in mergedValues) {
            if (mergedValues.hasOwnProperty(key)) {
                const value = mergedValues[key];
                if (value !== null && !isNaN(Number(value))) {
                    convertedMergedValues[key] = Number(value);
                } else {
                    convertedMergedValues[key] = value;
                }
            }
        }

        this.getSettingsInfoService.setLimits(convertedMergedValues).pipe(take(1)).subscribe(data => {
            if (data.ResponseCode !== 0) {
                this.selfLimitationResponse$.next({message: data.Description, type: 'Error'});
                if (formNumber === 1) {
                    if (data.Description) {
                        this.utilityService.showMessageWithDelay(this, [{'error1': data.Description}]);
                    } else {
                        this.utilityService.showMessageWithDelay(this, [{'error1': 'Error'}]);
                    }
                } else if (formNumber === 2) {
                    if (data.Description) {
                        this.utilityService.showMessageWithDelay(this, [{'error2': data.Description}]);
                    } else {
                        this.utilityService.showMessageWithDelay(this, [{'error2': 'Error'}]);
                    }
                } else if (formNumber === 3) {
                    if (data.Description) {
                        this.utilityService.showMessageWithDelay(this, [{'error3': data.Description}]);
                    } else {
                        this.utilityService.showMessageWithDelay(this, [{'error3': 'Error'}]);
                    }
                } else if (formNumber === 4) {
                    if (data.Description) {
                        this.utilityService.showMessageWithDelay(this, [{'error4': data.Description}]);
                    } else {
                        this.utilityService.showMessageWithDelay(this, [{'error4': 'Error'}]);
                    }
                }
                this.editSelfLimitation = true;
            } else {
                this.selfLimitationResponse$.next({
                    message: this.translate.instant('Settings.Successfully updated'),
                    type: 'Success'
                });
                if (formNumber === 1) {
                    this.utilityService.showMessageWithDelay(this, [{'success1': this.translate.instant('Settings.Successfully updated')}]);
                } else if (formNumber === 2) {
                    this.utilityService.showMessageWithDelay(this, [{'success2': this.translate.instant('Settings.Successfully updated')}]);
                } else if (formNumber === 3) {
                    this.utilityService.showMessageWithDelay(this, [{'success3': this.translate.instant('Settings.Successfully updated')}]);
                } else if (formNumber === 4) {
                    this.utilityService.showMessageWithDelay(this, [{'success4': this.translate.instant('Settings.Successfully updated')}]);
                }
                this.limitFormValueChanged = false;
                this.editSelfLimitation = false;
                this.setDepositMonthlyLimit = false;
                this.setLossLimit = false;
                this.setDepositLimit = false;
                this.onGetLimits();
            }
            this.loading = false;
        });
    }

    getClientStatuses1() {
        this.getSettingsInfoService.getClientStatuses().pipe(take(1)).subscribe(data => {
            this.clientStatuses = data.ResponseObject;
        });
    }

    selectedTime(month) {
        this.selectedMonth = month.Name;
        let newDate;
        if (month.Name === '1 month') {
            newDate = format(add(new Date(), {months: 1}), 'yyyy-MM-dd');
        } else if (month.Name === '3 month') {
            newDate = format(add(new Date(), {months: 3}), 'yyyy-MM-dd');
        } else if (month.Name === '6 month') {
            newDate = format(add(new Date(), {months: 6}), 'yyyy-MM-dd');
        } else if (month.Name === '12 month') {
            newDate = format(add(new Date(), {months: 12}), 'yyyy-MM-dd');
        } else if (month.Name === 'Permanently') {
            newDate = format(add(new Date(), {years: 100}), 'yyyy-MM-dd');
        }
        this.exclusionDate = newDate;
    }

    openConfirmWindow() {
        const dialogRef =  this.dialog.open(ConfirmWindowComponent,{data:{title: this.selectedExclusionType}});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.exclusionDate = this.exclusionDate ? this.exclusionDate : format(add(new Date(), {years: 100}), 'yyyy-MM-dd');
                const encryptedPassword = encryptSelfExclusionData(this.setConfirmPassword);
                const finalData = {
                    Date: this.exclusionDate,
                    Credentials: encryptedPassword,
                    Reason: this.selectedReasonId
                };
                this.getSettingsInfoService.applySelfExclusion(finalData).pipe(take(1)).subscribe(data => {
                    if (data.ResponseCode == 0) {
                        this.utilityService.showMessageWithDelay(this, [{'successMessage': 'Your account has been successfully blocked.'}]);
                        this.logoutHelper.logout(8);
                    } else {
                        if (data.Description) {
                            this.utilityService.showMessageWithDelay(this, [{'error5': data.Description}]);
                        } else {
                            this.utilityService.showMessageWithDelay(this, [{'error5': 'Error'}]);
                        }
                    }
                });
            }
        });
    }

    depositLimitChange(event) {
        this.depositMonthly = Number(event.target.value);
        this.showPercentage = this.depositMonthly >= this.limits.MaxDepositLimitMonthly;
        // setTimeout(() => {
        //     this.twentyPercent = this.depositMonthly * 0.2;
        //     this.limitForm.controls['TotalLossLimitMonthly'].setValue(this.twentyPercent);
        // }, 1000);
    }

    totalLostLimitChange(event) {
        this.totalLostChangeValue = Number(event.target.value);
        setTimeout(() => {
            this.twentyPercent = this.totalLostChangeValue * (this.limits.DefaultLossPercentMonthly * 0.01);
            this.twentyPercent = +this.twentyPercent.toFixed(2);
            if (this.selectedItem === 'Day') {
                this.limitForm.controls['TotalLossLimitDaily'].setValue(this.twentyPercent);
            } else if (this.selectedItem === 'Week') {
                this.limitForm.controls['TotalLossLimitWeekly'].setValue(this.twentyPercent);
            } else {
                this.limitForm.controls['TotalLossLimitMonthly'].setValue(this.twentyPercent);
            }

            const labelElement = this.amountLabel.nativeElement;
            if (event.target.value || this.twentyPercent) {
                labelElement.classList.add('active');
            } else {
                labelElement.classList.remove('active');
            }
        }, 1000);
    }

    changeDepositMonthlyLimit() {
        this.setDepositMonthlyLimit = !this.setDepositMonthlyLimit;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    changeLossLimit() {
        this.setLossLimit = !this.setLossLimit;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    changeLimitItem(item) {
        this.selectedItem = item;
    }

    changeDepositLimit() {
        this.setDepositLimit = !this.setDepositLimit;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    public selectReason(reason) {
        this.selectedReason = reason.Name;
        this.selectedReasonId = reason.Value;
        if (this.selectedReasonId === 4 || this.selectedReasonId === 5) {
            this.months = this.months.filter(month => month.Name !== '1 month');
            this.selectedMonth = undefined;
        } else {
            this.months = this.allMonths;
        }
    }

}
