import {Component, Injector, Input, OnInit} from '@angular/core';
import {NewsFragment} from "../../../../../../../@core/models";

@Component({
  selector: 'current-news',
  templateUrl: './current-news.component.html'
})
export class CurrentNewsComponent implements OnInit{

  @Input() newsFragment:NewsFragment;
  newsTypes:any = {
    0:'Sport',
    1:'Casino',
    2:'Live Casino',
    3:'Virtual Games',
    4:'Skill Games'
  }
  constructor(public injector: Injector)
  {
  }
  ngOnInit() {
  }
}
