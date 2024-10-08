import { Injectable } from '@angular/core';
import {Region} from "../../../../@core/interfaces";
import {BehaviorSubject, take} from "rxjs";
import {Methods} from "../../../../@core/enums";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";

export interface IProfileState
{
  isReset:boolean;
  value:boolean;
}

@Injectable({providedIn:"root"})

export class ProfileService
{
  initialData:any;
  countries:Region[] = [];
  districts:Region[] = [];
  cities:Region[] = [];
  towns:Region[] = [];

  CountryIdPattern:string;
  DistrictIdPattern:string;
  CityIdPattern:string;
  TownIdPattern:string;

  private readonly _editState = new BehaviorSubject<IProfileState>({value:false,isReset:true});
  readonly editState$ = this._editState.asObservable();

  private readonly _profileData = new BehaviorSubject<any>(null);
  readonly profileData$ = this._profileData.asObservable();

  constructor(private baseApiService:BaseApiService)
  {

  }

  get getEditState():IProfileState
  {
    return this._editState.getValue();
  }

  changeEditState(newState: IProfileState)
  {
    this._editState.next({...this.getEditState, ...newState});
  }

  get getProfile():any
  {
    return this._profileData.getValue();
  }

  updateProfile(profile)
  {
    const d = new Date(profile.BirthDate);
    const current = new Date();
    if(current.getFullYear() - d.getFullYear() > 100)
    {
      profile.BirthDay = null;
      profile.BirthMonth = null;
      profile.BirthYear = null;
      profile.BirthDate = null;
    }
    else
    {
      profile.BirthDay = d.getDate();
      profile.BirthMonth = d.getMonth() + 1;
      profile.BirthYear = d.getFullYear();
    }
    this._profileData.next(profile);
  }

  getClientInfo()
  {
    this.baseApiService.apiPost('',{},Methods.GET_CLIENT_INFO,false).pipe(take(1)).subscribe(data => {
      if(data.ResponseCode === 0)
      {
        this.mapVerificationStates(data);
        this.updateProfile(data);
      }
    });
  }

  mapVerificationStates(data)
  {
    Object.entries(data).forEach(([key, value])=> {
      switch (key)
      {
        case 'Email':
          if(!value)
            data[key + 'VerificationState'] = 'rejected';
          else if(!data.IsEmailVerified)
            data[key + 'VerificationState'] = 'pending';
          else if(data.IsEmailVerified)
            data[key + 'VerificationState'] = 'verified';
          break;
        case 'MobileNumber':
          if(!value)
            data[key + 'VerificationState'] = 'rejected';
          else if(!data.IsMobileNumberVerified)
            data[key + 'VerificationState'] = 'pending';
          else if(data.IsMobileNumberVerified)
            data[key + 'VerificationState'] = 'verified';
          break;
        case 'FirstName':
        case 'LastName':
        case 'BirthDate':
        case 'DocumentNumber':
          if(!value || data['PersonalDataVerifiedState'] == 1)
            data[key + 'VerificationState'] = 'rejected';
          else if(data['PersonalDataVerifiedState'] == 2)
            data[key + 'VerificationState'] = 'pending';
          else if(data['PersonalDataVerifiedState'] == 3)
          {
            data[key + 'VerificationState'] = 'verified';
            data[key + 'Disabled'] = true;
          }
          break;
        case 'Address':
        case 'CountryId':
        case 'DistrictId':
        case 'CityId':
        case 'City':
        case 'TownId':
          if(!value || data['AddressVerifiedState'] == 1)
            data[key + 'VerificationState'] = 'rejected';
          else if(data['AddressVerifiedState'] == 2)
            data[key + 'VerificationState'] = 'pending';
          else if(data['AddressVerifiedState'] == 3)
            data[key + 'VerificationState'] = 'verified';
          break;
        // case 'DocumentNumber':
        //   if(!value)
        //     data[key + 'VerificationState'] = 'rejected';
        //   else if(!data.IsDocumentVerified)
        //     data[key + 'VerificationState'] = 'pending';
        //   else if(data.IsDocumentVerified)
        //     data[key + 'VerificationState'] = 'verified';
        //   break;
        default:
          if(!value)
            data[key + 'VerificationState'] = 'rejected';
          else
            data[key + 'VerificationState'] = 'verified';
          break;
      }
    });
  }
}
