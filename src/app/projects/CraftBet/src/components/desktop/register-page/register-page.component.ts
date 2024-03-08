import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserLogined} from "@core/services/app/userLogined.service";

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private router:Router, private userLoginService:UserLogined)
  {
    if(this.userLoginService.isAuthenticated)
      this.router.navigate(["/"]);
  }

}
