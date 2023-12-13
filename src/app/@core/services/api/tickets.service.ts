import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../app/config.service';
import {Request, Ticket, TicketMessage} from "@core/models";
import {LocalStorageService} from "@core/services/app/localStorage.service";
import {UserDataService} from "@core/services";
import {Controllers, Methods} from "@core/enums";
import {Observable, Subject} from "rxjs";

@Injectable()
export class TicketsService {

    public userData: any;
    public notifyOpenTicket: Subject<any> = new Subject<any>();
    public notifyOpenTicketError: Subject<any> = new Subject<any>();
    public notifyGetClientTickets: Subject<any> = new Subject<any>();
    public notifyGetClientTicketsError: Subject<any> = new Subject<any>();
    public notifyDeleteTicket: Subject<any> = new Subject<any>();
    public notifyDeleteTicketError: Subject<any> = new Subject<any>();
    public notifyCreateMessage: Subject<any> = new Subject<any>();
    public notifyCreateMessageError: Subject<any> = new Subject<any>();
    public notifyGetTicketMessages: Subject<any> = new Subject<any>();
    public notifyGetTicketMessagesError: Subject<any> = new Subject<any>();
    public notifyGetCloseTicketMessages: Subject<any> = new Subject<any>();
    public notifyGetCloseTicketMessagesError: Subject<any> = new Subject<any>();
    public notifyGetTicketInfoByBarcode: Subject<any> = new Subject<any>();
    public notifyGetTicketInfoByBarcodeError: Subject<any> = new Subject<any>();
    public notifyUpdateUserMessages: Subject<any> = new Subject<any>();

    private _notifyNotLoginOpenTicket: Subject<any> = new Subject<any>();
    public notifyNotLoginOpenTicket$ = this._notifyNotLoginOpenTicket.asObservable();

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService,
                private configService: ConfigService,
                private userDataService: UserDataService) {
        this.userData = this.localStorageService.get("user");
    }

    public getSettings() {
        return this.configService.defaultOptions;
    }

    public createMessage(ticketId: number, message: string, imageName: string, imageData: string) {
        let request = new Request();
        request.RequestData = JSON.stringify({
            TicketId: ticketId.toString(),
            Message: message,
            ImageName: imageName,
            ImageData: imageData
        });
    }

    DeleteTicket(ticket: Ticket) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.DELETE_TICKET;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = ticket.Id.toString();

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0)
                this.notifyDeleteTicket.next(data["ResponseObject"]);
            else this.notifyDeleteTicketError.next((data["Description"]));
        });
    }

    CloseTicket(ticket: Ticket) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.CLOSE_TICKET;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = ticket.Id.toString();
        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data['ResponseCode'] === 0) {
                this.notifyGetCloseTicketMessages.next(data["ResponseObject"]);
            } else {
                this.notifyGetCloseTicketMessagesError.next(data['Description']);
            }
        });
    }

    CreateMessage(message: TicketMessage) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.TimeZone = this.configService.timeZone;
        request.Method = Methods.CREATE_MESSAGE;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify({
            TicketId: message.TicketId,
            Message: message.Message
        });
        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0) {
                this.notifyCreateMessage.next(data["ResponseObject"]);
            } else this.notifyCreateMessageError.next((data["Description"]));
        });
    }

    GetTicketMessages(ticket: Ticket) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.GET_TICKET_MESSAGES;
        request.TimeZone = this.configService.timeZone;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = ticket.Id.toString();
        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0) {
                this.notifyGetTicketMessages.next(data["ResponseObject"]);
                this.userDataService.getClientStates();
                // this.GetClientStates(); Remove GetClientStates function from userData service
            } else this.notifyGetTicketMessagesError.next((data["Description"]));
        });
    }

    GetClientStates() {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.Loader = false;
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.GET_CLIENT_STATES;
        this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data.ResponseCode == 0) {
                this.notifyUpdateUserMessages.next(data.ResponseObject);
            }
        });
    }

    CreateTicket(ticket: Ticket): any {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.OPEN_TICKET;
        request.Token = this.userData.Token;
        request.TimeZone = this.configService.timeZone;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify(ticket);
        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0)
                this.notifyOpenTicket.next(data["ResponseObject"]);
            else this.notifyOpenTicketError.next((data["Description"]));
        });
    }

    CreateNotLoginTicket(data) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.PartnerId = PartnerId;
        request.TimeZone = this.configService.timeZone;
        request.LanguageId = localStorage.getItem('lang');

        let input = {...data, ...request};

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/SendEmailToPartner`, input).subscribe(data => {
            if (data['ResponseCode'] == 0) {
                this._notifyNotLoginOpenTicket.next({message: ""});
            } else {
                this._notifyNotLoginOpenTicket.next({message: data['Description']});
            }
        });
    }

    GetTickets(skipCount: number = 0, takeCount: number = 5, Status) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.GET_CLIENT_TICKETS;
        request.TimeZone = this.configService.timeZone;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify({
            SkipCount: skipCount,
            TakeCount: takeCount,
            Statuses: Status
        });

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0)
                this.notifyGetClientTickets.next(data["ResponseObject"]);
            else this.notifyGetClientTicketsError.next((data["Description"]));
        });
    }


    GetTicketInfoByBarcode(data) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.PartnerId = PartnerId;
        request.TimeZone = this.configService.timeZone;
        request.LanguageId = localStorage.getItem('lang');
        request.Barcode = data['Barcode'];

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/GetTicketInfoByBarcode`, request).subscribe(data => {
            if (data['ResponseCode'] == 0) {
                this.notifyGetTicketInfoByBarcode.next(data['ResponseObject']);
            } else {
                this.notifyGetTicketInfoByBarcodeError.next(data['Description']);
            }
        });
    }

    getTicketSubjects(): Observable<any> {
        const { WebApiUrl, PartnerId } = this.getSettings();
        const request = new Request();
        request.PartnerId = PartnerId;
        request.TimeZone = this.configService.timeZone;
        request.LanguageId = localStorage.getItem('lang');
        return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/GetTicketSubjects`, request);
    }
}
