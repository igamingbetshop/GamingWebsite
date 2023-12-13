import { Component, OnInit } from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-mobile-contact-us',
  templateUrl: './mobile-contact-us.component.html',
  styleUrls: ['./mobile-contact-us.component.scss']
})
export class MobileContactUsComponent implements OnInit {

  public faWhatsapp = faWhatsapp;
  constructor(public layoutService:LayoutService) { }

  ngOnInit() {
  }

}
