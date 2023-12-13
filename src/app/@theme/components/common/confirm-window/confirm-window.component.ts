import {Component} from "@angular/core";
import {SimpleModalComponent} from "ngx-simple-modal";

@Component({
  selector: 'confirm-window',
  templateUrl: 'confirm-window.component.html',
})

export class ConfirmWindowComponent  extends SimpleModalComponent<any, boolean>
{
  public title: string;
  constructor()
  {
    super();
  }

  confirm()
  {
    this.result = true;
    this.close();
  }
  cancel()
  {
    this.result = false;
    this.close();
  }
}
