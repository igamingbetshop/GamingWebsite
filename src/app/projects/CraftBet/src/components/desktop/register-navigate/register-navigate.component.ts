import { Component} from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService, SaveData} from "../../../../../../@core/services";

@Component({
  selector: 'register-navigate',
  template: ``,
})
export class RegisterNavigateComponent {

  constructor(private router:Router, private savedData:SaveData, private config:ConfigService)
  {
    this.router.navigate([this.config.defaultOptions.HomePageUrl]).then(data => {
      this.savedData.openPopup.next(2);
    });
  }
}
