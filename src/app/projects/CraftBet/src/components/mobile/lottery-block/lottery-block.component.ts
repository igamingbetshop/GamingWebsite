import { Component, OnInit } from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-lottery-block',
  templateUrl: './lottery-block.component.html',
  styleUrls: ['./lottery-block.component.scss']
})
export class LotteryBlockComponent implements OnInit {

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
  }

}
