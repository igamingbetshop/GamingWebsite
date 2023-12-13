import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GlobalTicketsComponent} from "./global-tickets.component";

@NgModule({
  declarations:[GlobalTicketsComponent],
    exports:[GlobalTicketsComponent],
  imports:[
    CommonModule,
  ]
})

export class TicketsModule
{
    getComponents()
    {
        return GlobalTicketsComponent;
    }
}
