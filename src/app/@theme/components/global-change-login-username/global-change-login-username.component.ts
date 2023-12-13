import {Component, Injector, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validator} from "@core/validators/validators";
import {Controllers, Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {SaveData} from "@core/services";

@Component({
    selector: 'app-global-change-login-username',
    templateUrl: './global-change-login-username.component.html',
    styleUrls: ['./global-change-login-username.component.scss']
})
export class GlobalChangeLoginUsernameComponent implements OnInit {
    public fb: FormBuilder;
    public userNameForm: FormGroup;
    public baseApiService: BaseApiService;
    public saveData: SaveData;

    @Input() className: string = '';
    @Input() showIcons: boolean = false;
    public errorMessage = '';
    public successMessage = '';

    constructor(public injector: Injector) {
        this.fb = injector.get(FormBuilder);
        this.baseApiService = injector.get(BaseApiService);
        this.saveData = injector.get(SaveData);
        this.userNameForm = this.fb.group({
            'ChangeNickName': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(5)
            ]],
        });
    }

    ngOnInit() {
    }

    saveChanges() {
        this.baseApiService.apiRequest(this.userNameForm.get('ChangeNickName').value, Controllers.CLIENT, Methods.CHANGE_NICK_NAME).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.successMessage = 'Success';
                setTimeout(() => {
                    this.successMessage = "";
                }, 5000);
                this.saveData.changeNickName.next('1');
            } else {
                this.errorMessage = data['Description'];
                setTimeout(() => {
                    this.errorMessage = "";
                }, 5000);
            }
        });
    }


}
