import {Component} from '@angular/core';
import {BaseHome} from "../../../../../../@theme/fragments/home/base-home";
import {FragmentSource} from "../../../../../../@core/enums";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseHome
{
  ngOnInit()
  {
    this.fragmentKey = FragmentSource.Web;
    super.ngOnInit();
  }
}
