import {Component, inject, signal} from '@angular/core';
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {Controllers, Methods} from "../../../@core/enums";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DropdownDirectiveModule} from "../../directives/dropdown/dropdown-directive.module";
import {take} from "rxjs/operators";
import {LocalStorageService} from "@core/services";
import {TranslateModule} from "@ngx-translate/core";
import {UserLogined} from "@core/services/app/userLogined.service";

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [DropdownDirectiveModule, TranslateModule],
  standalone:true
})

export class ClientsComponent  {

  clients = signal<DownLineClient[]>([]);
  selectedClient = signal<DownLineClient>({Id:0, UserName:"SelectClient", Token:null});
  userLogin = inject(UserLogined);

  constructor(private baseApiService: BaseApiService, private localStorageService:LocalStorageService)
  {
    this.getDownLineClients();
    this.getClientIfExists();
  }

  getDownLineClients()
  {
    this.baseApiService.apiRequest({Token:this.userLogin.agent.Token, ClientId:this.userLogin.agent.Id, IsAgent:true}, Controllers.AGENT, Methods.GET_DOWN_LINE_CLIENTS).pipe(takeUntilDestroyed()).subscribe(data => {
        if(data.ResponseCode === 0)
        {
          this.clients.set(data.ResponseObject);
        }
    })
  }

  selectAgent()
  {
    this.localStorageService.add("user", this.userLogin.agent);
    location.reload();
  }

  selectClient(client:DownLineClient)
  {
    this.selectedClient.set(client);
    this.createToken();
  }

  createToken()
  {
    if(this.selectedClient().Id)
    {
      this.baseApiService.apiPost(null,{IsAgent:true, Token:this.userLogin.agent.Token, ClientId:this.selectedClient().Id}, Methods.CREATE_TOKEN, false).pipe(take(1)).subscribe(data => {
        if(data.ResponseCode === 0)
        {
          this.localStorageService.add("user", data);
          location.reload();
        }
      });
    }
  }

  getClientIfExists()
  {
    /*const client = this.localStorageService.get("downLineClient");
    if(client)
      this.selectedClient.set(client);*/
  }
}

export interface DownLineClient{
  Id:number;
  UserName:string;
  Token:string;
}
