import {Injectable, Injector} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Controllers, Methods} from "@core/enums";
import {Subject, forkJoin, Observable, take, tap} from "rxjs";
import {ConfigService, LocalStorageService, PaymentsService} from "@core/services";
import {BaseApiService} from "@core/services/api/base-api.service";
import {compressImage} from "@core/utils";

@Injectable()
export class GetSettingsInfoService {
    private configService: ConfigService;
    public localStorageService: LocalStorageService;
    public paymentsService: PaymentsService;
    public translate: TranslateService;
    public baseApiService: BaseApiService;

    public documentTypesList: any[] = [];
    public identityModelsList: any[] = [];
    public documentStatesEnumList: any[] = [];
    public uploadObj = {
        'ClientId': '',
        'Name': '',
        'ImageData': '',
        'Extension': '',
        'DocumentTypeId': '',
        'Status': ''
    };
    public userData: any;
    public defaultOption: any;
    public clientDetail: any;
    public checkDocumentSize: boolean;

    public validDocumentSize: boolean;
    public validDocumentFormat: boolean;
    private msgTimeout;

    public _notifyGetChangePasswordResponseMessage = new Subject<any>();
    private notifyGetChangePasswordResponseMessage$ = this._notifyGetChangePasswordResponseMessage.asObservable();

    public _notifyGetDocumentTypesList = new Subject<any>();
    private notifyGetDocumentTypesList$ = this._notifyGetDocumentTypesList.asObservable();

    public _notifyGetDocumentTypesResponse = new Subject<any>();
    private notifyGetDocumentTypesResponse$ = this._notifyGetDocumentTypesResponse.asObservable();

    public _notifyGetChooseFileName = new Subject<any>();
    private notifyGetChooseFileName$ = this._notifyGetChooseFileName.asObservable();

    public _notifyGetDocumentError = new Subject<any>();
    private notifyGetDocumentError$ = this._notifyGetDocumentError.asObservable();

    private _notifyGetDocumentUploadResponseMessage = new Subject<any>();
    public notifyGetDocumentUploadResponseMessage$ = this._notifyGetDocumentUploadResponseMessage.asObservable();

    private readonly _notifyGetChangeDataResponseMessage = new Subject<any>();
    public readonly onSaveClientDetails$ = this._notifyGetChangeDataResponseMessage.asObservable();

    constructor(public injector: Injector) {
        this.configService = injector.get(ConfigService);
        this.paymentsService = injector.get(PaymentsService);
        this.localStorageService = injector.get(LocalStorageService);
        this.translate = injector.get(TranslateService);
        this.baseApiService = injector.get(BaseApiService);

        this.userData = this.localStorageService.get('user');
        this.defaultOption = this.configService.defaultOptions;

        this.clientDetail = {
            'ClientId': this.userData.Id,
            'Email': this.userData.Email,
            'IsEmailVerified': this.userData.IsEmailVerified,
            'CurrencyId': this.userData.CurrencyId,
            'BirthDate': this.userData.BirthDate,
            'FirstName': this.userData.FirstName,
            'LastName': this.userData.LastName,
            'DocumentNumber': this.userData.DocumentNumber,
            'DocumentIssuedBy': this.userData.DocumentIssuedBy,
            'Info': this.userData.Info || null,
            'Address': this.userData.Address,
            'MobileNumber': this.userData.MobileNumber,
            'IsMobileNumberVerified': this.userData.IsMobileNumberVerified,
            'LanguageId': this.userData.LanguageId || this.defaultOption.Language,
            'IsDocumentVerified': this.userData.IsDocumentVerified
        };
    }

    public applySelfExclusion(data) {
        return this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.APPLY_SELF_EXCLUSION);
    }

    public closeAccount(data) {
        return this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.DISABLE_CLIENT_ACCOUNT);
    }

    public changePassword(data)
    {
       return  this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.CHANGE_CLIENT_PASSWORD).pipe(tap(responseData => {
           if (responseData.ResponseCode === 0) {
               this._notifyGetChangePasswordResponseMessage.next({
                   'className': 'success_message',
                   'message': 'Your password has been changed successfully.'
               });
           } else {
               this._notifyGetChangePasswordResponseMessage.next({
                   'className': 'error_message',
                   'message': responseData['Description']
               });
           }
       }));
    }


    public acceptTermCondition(): Observable<any> {
        return this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.ACCEPT_TERMS_CONDITIONS);
    }


    public documentTypes() {
        const input = {};
        this.baseApiService.apiRequest(input, Controllers.CLIENT, Methods.KYC_DOCUMENT_TYPES_ENUM).subscribe((responseData) => {
            if (responseData.ResponseCode === 0) {
                this._notifyGetDocumentTypesResponse.next(responseData['ResponseObject']);
                const documentTypesResponse = responseData['ResponseObject'];

                this.uploadDocumentData().subscribe((responses): any => {
                    let clientIndentityModels, kycdocumentStatesEnum;
                    this.documentTypesList = documentTypesResponse;
                    this._notifyGetDocumentTypesList.next(documentTypesResponse);

                    responses.forEach((item) => {
                        if (item['ResponseCode'] === 0) {
                            kycdocumentStatesEnum = responses[0].ResponseObject;
                            clientIndentityModels = responses[1].ResponseObject;
                        }
                    });

                    if (clientIndentityModels !== null) {
                        clientIndentityModels.map((element) => {

                            /*for (let i = 0; i < documentTypesResponse.length; i++) {
                              if (element.DocumentTypeId === documentTypesResponse[i].Id) {
                                element.DocumentName = documentTypesResponse[i].Name;
                              }
                            }*/

                            for (let k = 0; k < kycdocumentStatesEnum.length; k++) {
                                if (element.Status === kycdocumentStatesEnum[k].Id) {
                                    element.StatusName = kycdocumentStatesEnum[k].Name;
                                }
                            }
                        });
                        this.identityModelsList = clientIndentityModels;
                    }
                });

            } else {
                this._notifyGetDocumentTypesResponse.next(responseData['Description']);
            }
        });

    }


    public uploadDocumentData(): Observable<any> {
        const input = {};
        const responseEnums: any = this.baseApiService.apiRequest(input, Controllers.CLIENT, Methods.KYC_DOCUMENT_STATES_ENUM),
            responseIdentityModels: any = this.baseApiService.apiRequest(input, Controllers.CLIENT, Methods.CLIENT_IDENTITYMODELS);
        return forkJoin(responseEnums, responseIdentityModels);
    }


    public uploadFile(data) {
        var file = data.dataTransfer ? data.dataTransfer.files[0] : data.target.files[0];
        if (file)
        {
            this.validDocumentSize = file.size < 5000000;
            this.validDocumentFormat = file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
            clearTimeout(this.msgTimeout);
            if (this.validDocumentSize && this.validDocumentFormat)
            {
                this.checkDocumentSize = true;
                const reader = new FileReader();
                reader.onload = () => {
                    let binaryString = reader.result as string;
                    if(file.size < 700000)
                    {
                        this.uploadObj.ImageData = binaryString.substr(binaryString.indexOf(',') + 1);
                        this._notifyGetChooseFileName.next(this.uploadObj);
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
                                            this.uploadObj.ImageData = base64data.substr(binaryString.indexOf(',') + 1);
                                            this._notifyGetChooseFileName.next(this.uploadObj);
                                        }
                                    }
                                },
                                file.type,
                                0.7)
                        }
                    }
                };

                reader.readAsDataURL(file);
                this.uploadObj.Name = file.name;
                this.uploadObj.Extension = file.name.substring(file.name.lastIndexOf(".") + 1);
            } else {
                this.checkDocumentSize = false;
                this.translate.get('Error.size_format').subscribe((message: string) => {
                    this._notifyGetDocumentError.next(message);
                });
                this.msgTimeout = setTimeout(() => {
                    this.validDocumentSize = undefined;
                    this.validDocumentFormat = undefined;
                }, 5000);
            }
        }
    }

    public uploadDocument(selectType) {
        if (this.uploadObj.Name) {
            this.uploadObj.DocumentTypeId = selectType;
            this.uploadObj.ClientId = this.userData.Id;

            this.baseApiService.apiRequest(this.uploadObj, Controllers.CLIENT, Methods.UPLOAD_IMAGE).subscribe((responseData) => {
                if (responseData['ResponseCode'] === 0) {
                    this.translate.get('Settings.DocumentSuccessMessage').subscribe((message: string) => {
                        this._notifyGetDocumentUploadResponseMessage.next({type: 'Success', message: message});
                        this.documentTypes();
                    });
                } else {
                    this._notifyGetDocumentUploadResponseMessage.next({type: 'Error', message: responseData['Description']});
                }
            });
        } else {
            this.translate.get('Error.Field is required').subscribe((message: string) => {
                this._notifyGetDocumentUploadResponseMessage.next({type: 'Error', message: message});
            });
        }

    }

    getClientStatuses() {
        return this.baseApiService.apiRequest(null, Controllers.CLIENT, Methods.GET_CLIENT_STATUSES)
    }

    public setLimits(data) {
        return this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.SET_LIMITS)
    }

    public getLimits() {
        return this.baseApiService.apiRequest(null, Controllers.CLIENT, Methods.GET_LIMITS)
    }

    public saveChangeData(data)
    {
        const input = Object.assign(this.clientDetail, data);

       return this.baseApiService.apiRequest(input, Controllers.CLIENT, Methods.CHANGE_CLIENT_DETAILS).pipe(take(1), tap((responseData) => {
           if (responseData['ResponseCode'] === 0)
           {
               Object.assign(this.clientDetail, input);
               const updatedUserData = Object.assign(this.userData, this.clientDetail);
               this.localStorageService.remove('user');
               this.localStorageService.add('user', updatedUserData);
               this.translate.get('Error.Success').subscribe((message: string) => {
                   this._notifyGetChangeDataResponseMessage.next({'Error': false, 'Message': message, Client:responseData.ResponseObject});
               });
           } else {
               this._notifyGetChangeDataResponseMessage.next({'Error': true, 'Message': responseData['Description'], Client:null});
           }
       }));

    }

    public changeUssdPin(data) {
        return this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.CHANGE_CLIENT_USSD_PIN);
    }


}
