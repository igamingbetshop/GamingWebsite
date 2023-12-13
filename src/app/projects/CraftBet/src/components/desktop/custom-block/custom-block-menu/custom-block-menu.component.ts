import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-block-menu',
  templateUrl: './custom-block-menu.component.html',
  styleUrls: ['./custom-block-menu.component.scss']
})
export class CustomBlockMenuComponent implements OnInit {

  @Input() menuList: Array<any>;

  constructor() {
  }

  ngOnInit() {
  }
}
