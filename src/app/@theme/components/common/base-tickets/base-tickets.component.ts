import {Directive, ElementRef, Inject, Injector, ViewChild} from '@angular/core';
import {ConfigService, DefaultService, LocalStorageService, SaveData} from "@core/services";
import {SimpleModalService} from "ngx-simple-modal";
import {TicketsService} from "@core/services/api/tickets.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from '../../base/base.component';
import {Ticket} from "@core/models";
import {DOCUMENT} from "@angular/common";

@Directive()
export class BaseTicketsComponent extends BaseComponent {
    @Inject(DOCUMENT) public document: Document;
    @ViewChild("ticketMessagesBox") ticketMessagesBox: ElementRef;
    @ViewChild("ticketMessagesSection") ticketMessagesSection: ElementRef;
    private timeOutId: any;
    public isShow: boolean = true;
    public defaultService: DefaultService;
    public localStorageService: LocalStorageService;
    public simpleModalService: SimpleModalService;
    public saveData: SaveData;
    public configService: ConfigService;
    public ticketsService: TicketsService;
    selectedTicket: Ticket;
    currentMessage: string;
    public changeTicket: any;
    public userData: any;
    public defaultOption: any;

    public showMessage: boolean;
    public ticketsCount: number;
    public totalUnreadMessagesCount: number;

    public ticketsList: Array<any> = [];
    public messageList: Array<any> = [];

    public sendMessageForm: FormGroup;
    public fb: FormBuilder;


    public page: number = 1;
    public historyInPage: number = 10;
    public expandedIndex: number;
    public messagesFetched = false;
    public customButtons = false;

    constructor(public injector: Injector) {
        super(injector);

        this.defaultService = injector.get(DefaultService);
        this.localStorageService = injector.get(LocalStorageService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.saveData = injector.get(SaveData);
        this.configService = injector.get(ConfigService);
        this.ticketsService = injector.get(TicketsService);
        this.fb = injector.get(FormBuilder);
        this.document = injector.get(DOCUMENT);

        this.sendMessageForm = this.fb.group({
            Message: ['', [
                Validators.required
            ]],
            attachFile: ['']
        });


        this.saveData.clickonButton.subscribe((responceData) => {
            if (responceData === '1') {
                this.getTicketsList();
            }
        });
    }


    public handleInputChange(input, inputData, event) {
        /*this.getSettingsInfoService.uploadFile(e);
        this.resetChangedFile();*/
        inputData.innerHTML = input.value;

        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {

                this.sendMessageForm.get('attachImage').setValue({
                    filename: file.name,
                    filetype: file.type,
                    /*value: reader.result.split(',')[1]*/
                })
            };
        }
    }

    createMessage() {

        if (this.sendMessageForm.value.attachImage)
            this.ticketsService.createMessage(this.selectedTicket.Id,
                this.currentMessage, this.sendMessageForm.value.attachImage.filename,
                this.sendMessageForm.value.attachImage.value);
        else
            this.ticketsService.createMessage(this.selectedTicket.Id,
                this.currentMessage, '',
                '');
    }

    ngOnInit() {
        super.ngOnInit();
        this.expandedIndex = -1;

        this.getTicketsList();

        this.subscriptions.push(this.ticketsService.notifyDeleteTicket.subscribe(() => {
            this.expandedIndex = -1;
            this.getTicketsList();
        }));

        this.subscriptions.push(this.ticketsService.notifyCreateMessage.subscribe(() => {
            this.ticketsService.GetTicketMessages(this.changeTicket);
        }));

        this.subscriptions.push(this.ticketsService.notifyGetTicketMessages.subscribe((responceData) => {
            this.messagesFetched = true;
            this.messageList = responceData;
            this.getTicketsList();
            if (this.timeOutId)
                clearTimeout(this.timeOutId);
                this.timeOutId = setTimeout(() => {
                    if (this.ticketMessagesSection) {
                        this.ticketMessagesSection.nativeElement.scrollTop = this.ticketMessagesSection.nativeElement.scrollHeight;
                    }
                    if (this.ticketMessagesBox) {
                        this.ticketMessagesBox.nativeElement.scrollTop = this.ticketMessagesBox.nativeElement.scrollHeight;
                    }
                    clearTimeout(this.timeOutId);
                }, 100);
        }));

        this.subscriptions.push(this.ticketsService.notifyGetClientTickets.subscribe((responceData) => {
            this.ticketsList = responceData['Tickets'];
            this.ticketsCount = responceData['Count'];
            this.totalUnreadMessagesCount = responceData['TotalUnreadMessagesCount'];
            if (this.ticketsList.length === 0 && this.page !== 1) {
                this.getTicketsHistory(this.page - 1);
            }
        }));

        this.ticketsService.notifyOpenTicket.subscribe(() => {
            this.getTicketsList();
        });

        this.ticketsService.notifyGetCloseTicketMessages.subscribe(() => {
            this.getTicketsList();
        });

        this.userData = this.localStorageService.get('user');
        this.defaultOption = this.configService.defaultOptions;
        this.getTicketsList();


    }

    public getTicketsList() {
        let skipCount = this.page - 1,
            takeCount = this.historyInPage,
            Status = [1, 2];
        this.customButtons = true;
        this.ticketsService.GetTickets(skipCount, takeCount, Status);
    }

    public getTicketsHistory(page) {
        this.expandedIndex = -1;
        this.page = page;
        this.getTicketsList();
    }

    public openMessage(ticket, i) {
        this.messagesFetched = false;
        this.expandedIndex = i === this.expandedIndex ? -1 : i;
        this.messageList = [];
        if (this.expandedIndex !== -1) {
            this.ticketsService.GetTicketMessages(ticket);
            this.saveData.openTicket.next(ticket);
        } else {
            this.sendMessageForm.reset();
        }
        this.isShow = false;
    }

    public openTickets()
    {
        this.isShow = true;
    }

    public submit(ticketItem) {
        this.changeTicket = ticketItem;

        if (this.sendMessageForm.valid)
        {
            const input = this.sendMessageForm.getRawValue();
            input.TicketId = ticketItem.Id;
            this.ticketsService.CreateMessage(input);
            this.sendMessageForm.reset();
        }
    }


    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
