import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogined } from '@core/services/app/userLogined.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent {
  constructor(private router: Router, private userLoginService: UserLogined)
  {
    if(this.userLoginService.isAuthenticated)
      this.router.navigate(["/"]);
  }
}
