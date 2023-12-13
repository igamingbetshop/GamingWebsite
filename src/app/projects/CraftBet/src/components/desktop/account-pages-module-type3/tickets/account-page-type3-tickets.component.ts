import {Component, Injector} from '@angular/core';
import {AppCommonTicketsComponent} from '../../../common/app-common-tickets/app-common-tickets.component';

@Component({
    selector: 'app-account-page-type3-tickets',
    templateUrl: './account-page-type3-tickets.component.html',
    styleUrls: ['./account-page-type3-tickets.component.scss']
})
export class AccountPageType3TicketsComponent extends AppCommonTicketsComponent {
    isMessageBlockOpen: boolean = false;

    constructor(public injector: Injector) {
        super(injector);
    }

    public getTicketsList() {
        let skipCount = this.page - 1,
            takeCount = this.historyInPage,
            Status = [1, 2];
        this.customButtons = true;
        this.ticketsService.GetTickets(skipCount, takeCount, Status);
    }

    public openMessage(ticket, i) {
        this.messagesFetched = false;
        this.expandedIndex = i;
        this.isMessageBlockOpen = true;
        this.ticketsService.GetTicketMessages(ticket);
        this.saveData.openTicket.next(ticket);
    }

    public closeMessage() {
        this.expandedIndex = -1;
        this.isMessageBlockOpen = false;
        this.sendMessageForm.reset();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    trackByMethod(index, item) {
        return index;
    }

}
