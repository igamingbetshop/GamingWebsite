import { Component, OnInit } from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-about-us',
  templateUrl: './mobile-about-us.component.html',
  styleUrls: ['./mobile-about-us.component.scss']
})
export class MobileAboutUsComponent implements OnInit {

  constructor( public layoutService:LayoutService) { }

  ngOnInit() {
  }

}
