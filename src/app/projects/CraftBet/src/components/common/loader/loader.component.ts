import {Component, ViewEncapsulation} from '@angular/core';
import {BaseLoaderComponent} from "../../../../../../@theme/components/base/base-loader.component";

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone:true,
  encapsulation:ViewEncapsulation.None
})
export class LoaderComponent extends BaseLoaderComponent
{

  constructor()
  {
    super();
  }

}
