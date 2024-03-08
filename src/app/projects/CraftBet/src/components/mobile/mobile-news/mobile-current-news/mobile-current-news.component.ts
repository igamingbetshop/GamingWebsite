import {Component, Injector, Input, OnInit} from '@angular/core';
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";
import {NewsFragment} from "../../../../../../../@core/models";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'mobile-current-news',
  templateUrl: './mobile-current-news.component.html',
  standalone:true,
  imports:[CommonModule, RouterModule, TranslateModule],
})
export class MobileCurrentNewsComponent implements OnInit{

  @Input() newsFragment:NewsFragment;
  newsTypes:any = {
    0:'Sport',
    1:'Casino',
    2:'Live Casino',
    3:'Virtual Games',
    4:'Skill Games'
  }
  constructor(public injector: Injector, public layoutService:LayoutService)
  {
  }

  ngOnInit() {
  }
}
