import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService, SaveData} from "@core/services";
import {Subject} from "rxjs";
import {TicketsService} from "@core/services/api/tickets.service";
import {StateService} from "@core/services/app/state.service";


@Component({
  selector: 'app-global-tickets',
  templateUrl: './global-tickets.component.html',
  styleUrls: ['./global-tickets.component.scss']
})
export class GlobalTicketsComponent implements OnInit {

  @Input() unreadMessagesCount: number;
  @Input() menuItem: any;
  @Input() openModal;
  private output = new Subject<string>();
  constructor(private router: Router, private configService: ConfigService,
              private ticketsService: TicketsService,
              private stateService:StateService,
              private savedDateService: SaveData) {}

  ngOnInit() {
    this.ticketsService.notifyUpdateUserMessages.subscribe((data) => {
      this.unreadMessagesCount = data['UnreadMessagesCount'];
    });
  }

  openTiketsPage(event:MouseEvent)
  {
    event.stopPropagation();
    if (this.openModal) {
      this.savedDateService.getCurrentSubItem(this.menuItem);
      this.stateService.openModal({label:this.menuItem?.Href})
    } else {
      const url = '/user/'+ (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) +'/tickets';
      this.router.navigate([url]);
      this.output.next('');
    }
  }

}
