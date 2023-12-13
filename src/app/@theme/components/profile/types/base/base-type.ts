import {Directive, Injector, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ProfileService} from "../../service/profile.service";

@Directive()
export class BaseType
{
    @Input('formGroup') formGroup:FormGroup;
    @Input('formControlName') formControlName:string;
    @Input('config') config:any;
    @Input('formElement') formElement:any;

    profileService:ProfileService;

    constructor(protected injector:Injector)
    {
        this.profileService = injector.get(ProfileService);
    }
}