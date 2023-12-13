import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-verify-email',
  templateUrl: './app-verify-email.component.html',
  styleUrls: ['./app-verify-email.component.scss']
})
export class AppVerifyEmailComponent implements OnInit {

  constructor(private deviceService: DeviceDetectorService,
              private router:Router) { }

  ngOnInit() {
    let type =  this.deviceService.isDesktop() ? 'desktop' : 'mobile';
    let url = "verify" + window.location.search;
    this.router.navigateByUrl(url);
  }

}
