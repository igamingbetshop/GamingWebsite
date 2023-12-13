import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {SimpleModalService} from "ngx-simple-modal";
import {UserLogined} from "@core/services/app/userLogined.service";

@Component({
  selector: 'app-app-live-casino',
  templateUrl: './app-live-casino.component.html',
  styleUrls: ['./app-live-casino.component.scss']
})
export class AppLiveCasinoComponent implements OnInit {

  public productBgName: string;
  public productList: Array<any> = [];

  constructor(public route: ActivatedRoute,
              public baseControllerService: BaseControllerService,
              private router:Router,
              private simpleModalService:SimpleModalService,
              private loginService:UserLogined)
  {
    this.route.data.subscribe((routeData) => {
      this.productBgName = routeData.productName;
      this.baseControllerService.GetProductList('HeaderPanel2Menu', this.productBgName).then((data: any) => {
        this.productList.push(...data);
      });
    });
  }

  ngOnInit() {
  }

  public openGame(url:string)
  {
    if(!this.loginService.isAuthenticated)
    {
      this.simpleModalService.addModal(AppConfirmComponent, {
        title: 'open_login',
        message: true
      }).subscribe((isConfirmed) => {});
    }
    else
    {
      this.router.navigate(['/' + url]);
    }
  }

}
