import {Component, Input, OnInit} from '@angular/core';
import {MenuType} from "@core/enums";
import {BaseControllerService} from "@core/services/app/baseController.service";

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {

  @Input() itemClassname: string;

  public paymentLogoList: Array<any> = [];

  constructor(public baseControllerService: BaseControllerService) {
  }

  ngOnInit() {
    this.baseControllerService.GetMenu(MenuType.FOOTER_MENU, 'en').then((menuData) => {
      menuData.forEach((item) => {
        if (item.Type === '2') {
          this.paymentLogoList = item.SubMenu;
        }
      });

    });
  }

}
