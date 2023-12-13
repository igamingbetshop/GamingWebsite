import {ChangeDetectorRef, Directive, ElementRef, Injector, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {FormGroup} from "@angular/forms";
import {UtilityService} from "../../../../@core/services/app/utility.service";
import {UserRegisterService} from "../../../../@core/services/app/userRegister.service";
import {compressImage} from "../../../../@core/utils";

@Directive()
export class BaseFile implements OnInit, OnDestroy
{
    @ViewChild('fileRef') fileRef: ElementRef;
    @Input('formGroup') formGroup:FormGroup;
    @Input('prevFormGroup') prevFormGroup:FormGroup;
    @Input('formControlName') formControlName:string;
    @Input('formLink') formLink:string;
    @Input('formOpenInRouting') formOpenInRouting;

    registerService:UserRegisterService;
    fileData:any = {name:'', source:''};
    errorMessage = false;
    validSize:boolean = false;

    private utilityService: UtilityService;

    constructor(protected injector: Injector)
    {
        this.utilityService = injector.get(UtilityService);
        this.registerService = injector.get(UserRegisterService);
    }

    ngOnInit()
    {
        this.changeSkipValue(this.registerService.checkboxStates[this.formControlName], false);
        let storedFileData:any = sessionStorage.getItem(this.formControlName);
        if(storedFileData)
        {
            this.fileData = JSON.parse(storedFileData);
        }
    }

    changeSkipValue(value, skip = true)
    {
        if(skip)
            this.registerService.checkboxStates[this.formControlName] = value ? true : null;

        if (this.registerService.checkboxStates[this.formControlName] === true) {
            if (this.fileRef)
                this.fileRef.nativeElement.value = '';
            this.fileData.source = '';
            this.fileData.name = '';
            sessionStorage.removeItem(this.formControlName);
            this.formGroup.get(this.formControlName).patchValue(this.fileData.source);
        }
        if(!skip)
        {
            const p = setTimeout(() => {
                clearTimeout(p);
                this.checkValidation();
            })
        }
        else
            this.checkValidation();
    }

    changeFile(data)
    {
        const file = data.dataTransfer ? data.dataTransfer.files[0] : data.target.files[0];
        if (file)
        {
            this.fileData.name = file.name;
            this.validSize = file.size < 5000000;
            if(this.validSize)
            {
                const reader = new FileReader();
                reader.onload = () => {
                    let binaryString = reader.result as string;
                    if(file.size < 700000)
                    {
                        this.fileData.source = binaryString.substr(binaryString.indexOf(',') + 1);
                        this.formGroup.get(this.formControlName).patchValue(this.fileData.source);
                        this.checkValidation();
                    }
                    else
                    {
                        const img = new Image();
                        img.src = binaryString;
                        img.onload = (data) => {
                            compressImage(img, 0.7).toBlob( (blob) => {
                                    if (blob)
                                    {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(blob);
                                        reader.onloadend = () =>  {
                                            const base64data = reader.result as string;
                                            this.fileData.source = base64data.substr(binaryString.indexOf(',') + 1);
                                            this.formGroup.get(this.formControlName).patchValue(this.fileData.source);
                                            this.checkValidation();
                                        }
                                    }
                                },
                                "image/jpeg",
                                0.7)
                        }
                    }

                };
                reader.readAsDataURL(file);
            }
            else
            {
                this.utilityService.showMessageWithDelay(this, [{ 'errorMessage': true }]);
                this.checkValidation();
            }
        }
    }

    ngOnDestroy()
    {
        this.registerService.checkboxStates[this.formControlName] = false;
        if(this.fileData.name)
            sessionStorage.setItem(this.formControlName, JSON.stringify(this.fileData));
    }

    public reset()
    {
        if (this.fileRef)
            this.fileRef.nativeElement.value = '';
        this.fileData.name = '';
        this.fileData.source = '';
        this.formGroup.get(this.formControlName).setValue(this.fileData.source);
    }

    private checkValidation()
    {
        if(this.registerService.checkboxStates[this.formControlName])
        {
            this.formGroup.get(this.formControlName).setErrors(null);
        }
        else
        {
            this.formGroup.get(this.formControlName).setErrors(this.validSize && this.fileData.name ? null : {'incorrect' : true});
        }
    }

    onChange: (value: any) => void = () => { };
    onTouch: any = () => { }
    writeValue(obj: any): void {

    }
    registerOnChange(fn: any): void {

    }
    registerOnTouched(fn: any): void {

    }

}
