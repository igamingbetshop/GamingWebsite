import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../app/config.service';
import {LocalStorageService} from './localStorage.service';
import {PaymentsService} from '../api/payments.service';
import {TranslateService} from "@ngx-translate/core";
import {Controllers, Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Subject} from "rxjs";

@Injectable()
export class GetSettingsService {

  private configService: ConfigService;
  public localStorageService: LocalStorageService;
  public paymentsService: PaymentsService;
  public translate: TranslateService;
  public baseApiService: BaseApiService;

  public userData: any;
  public defaultOption: any;
  public clientDetail: any;
  public uploadObj = {
    'ClientId': '',
    'Name': '',
    'ImageData': '',
    'Extension': '',
    'DocumentTypeId': '',
    'Status': ''
  };


  public notifyGetChangeDataErr: Subject<any> = new Subject<any>();
  public notifyGetChangePassErr: Subject<any> = new Subject<any>();
  public notifyGetDocumentTypes: Subject<any> = new Subject<any>();
  public notifyGetIdentityModels: Subject<any> = new Subject<any>();
  public notifyGetDocumentError: Subject<any> = new Subject<any>();
  public notifyGetDocumentUploadSuccessMessage: Subject<any> = new Subject<any>();
  public notifyGetDocumentUploadErrorMessage: Subject<any> = new Subject<any>();
  public notifyGetKYCDocumentStatesEnum: Subject<any> = new Subject<any>();
  public notifyGetKYCDocumentStatesEnumError: Subject<any> = new Subject<any>();
  public notifyGetChooseFileName: Subject<any> = new Subject<any>();
  public notifyGetAnnouncements: Subject<any> = new Subject<any>();


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

  public saveChangeData(data) {
    const filter = {
      'Controller': 'Client',
      'Method': 'ChangeClientDetails',
      'ClientId': this.userData.Id,
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'RequestData': JSON.stringify(Object.assign(this.clientDetail, data))
    };

    this.paymentsService.defaultRequest(filter).then((responceData) => {
      if (responceData['ResponseCode'] === 0) {
        this.localStorageService.add('user', Object.assign(this.userData, this.clientDetail));
        this.notifyGetChangeDataErr.next({'Error': false, 'Message': 'Success'});
      } else {
        this.notifyGetChangeDataErr.next({'Error': true, 'Message': data['Description']});
      }

    });
  }


  public changePassword(data) {
    const filter = {
      'ClientId': this.userData.Id,
      'Controller': 'Client',
      'Method': 'ChangeClientPassword',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'RequestData': JSON.stringify({
        'ClientId': this.userData.Id,
        'OldPassword': data.uOldPassword,
        'NewPassword': data.uNewPassword
      })
    };

    this.paymentsService.changePassword(filter).then((responceData) => {
      if (responceData['ResponseCode'] === 0) {
        this.notifyGetChangePassErr.next({'className': 'success_message', 'message': 'Success'});
      } else {
        this.notifyGetChangePassErr.next({'className': 'error_message', 'message': responceData['Description']});
      }
    });
  }

  public documentTypes() {

    const documentTypesRequest = {
      'ClientId': this.userData.Id,
      'Controller': 'Client',
      'Method': 'GetKYCDocumentTypesEnum',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token
    };

    this.paymentsService.defaultRequest(documentTypesRequest).then((data) => {
      if (data.ResponseCode === 0) {
        this.notifyGetDocumentTypes.next(data['ResponseObject']);
      } else {
        this.notifyGetDocumentTypes.next(data['Description']);
      }
    });

  }

  public clientIdentityModels() {

    const identityModelsRequest = {
      'ClientId': this.userData.Id,
      'Controller': 'Client',
      'Method': 'GetClientIdentityModels',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token
    };

    this.paymentsService.defaultRequest(identityModelsRequest).then((data) => {
      if (data.ResponseCode === 0) {
        this.notifyGetIdentityModels.next(data['ResponseObject']);
      } else {
        this.notifyGetIdentityModels.next(data['Description']);
      }
    });
  }

  public documentStatesEnum() {
    const documentStatesEnumRequest = {
      'ClientId': this.userData.Id,
      'Controller': 'Client',
      'Method': 'GetKYCDocumentStatesEnum',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token
    };

    this.paymentsService.defaultRequest(documentStatesEnumRequest).then((data) => {
      if (data.ResponseCode === 0) {
        this.notifyGetKYCDocumentStatesEnum.next(data['ResponseObject']);
      } else {
        this.notifyGetKYCDocumentStatesEnumError.next(data['Description']);
      }
    });

  }

  public uploadFile(data) {
    var file = data.dataTransfer ? data.dataTransfer.files[0] : data.target.files[0];

    if (file) {
      if (file.size < 3000000 && (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        var reader = new FileReader();

        reader.onload = () => {
          var binaryString = reader.result as string;
          this.uploadObj.ImageData = binaryString.substr(binaryString.indexOf(',') + 1);
        };

        reader.readAsDataURL(file);

        this.uploadObj.Name = file.name;
        this.uploadObj.Extension = file.name.substring(file.name.lastIndexOf(".") + 1);

      } else {
        this.notifyGetDocumentError.next('The size or format of chosen file is incorrect');
      }

      this.notifyGetChooseFileName.next(this.uploadObj);

    }

  }

  public uploadDocument(selectType) {
    if (this.uploadObj.Name) {
      this.uploadObj.DocumentTypeId = selectType;
      this.uploadObj.ClientId = this.userData.Id;
      let uploadImageRequest = {
        'Controller': 'Client',
        'ClientId': this.userData.Id,
        'Method': 'UploadImage',
        'TimeZone': this.configService.timeZone,
        'PartnerId': this.defaultOption.PartnerId,
        'Token': this.userData.Token,
        'RequestData': JSON.stringify(this.uploadObj)
      };

      this.paymentsService.defaultRequest(uploadImageRequest).then((responceData) => {
        if (responceData['ResponseCode'] === 0) {
          this.translate.get('Settings.DocumentSuccessMessage').subscribe((res: string) => {
            this.clientDetail.GenderName = res;
            this.notifyGetDocumentUploadSuccessMessage.next(res);
          });
        } else {
          this.notifyGetDocumentUploadErrorMessage.next(responceData['Description']);
        }
      });
    } else {
      this.notifyGetDocumentUploadErrorMessage.next('Field is required');
    }

  }


  getAnnouncementsList(filterData) {
    this.baseApiService.apiRequest(filterData, Controllers.CLIENT, Methods.GET_ANNOUNCEMENTS).subscribe((responceData) => {
      if (responceData['ResponseCode'] === 0) {
        this.notifyGetAnnouncements.next(responceData['ResponseObject']);
      }
    });

  }


}
