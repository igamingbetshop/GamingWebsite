import {OnInit, Injector, Output, EventEmitter, Directive, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  DefaultService,
  LocalStorageService,
  SaveData,
  ConfigService
} from '../../../../../../@core/services';
import {TicketsService} from "@core/services/api/tickets.service";
import {Ticket} from "../../../../../../@core/models/index";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {UtilityService} from "@core/services/app/utility.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Directive()
export class AppCommonOpenTicketComponent implements OnInit {
  @Output('onClose') onClose:EventEmitter<boolean> = new EventEmitter();
  public defaultService: DefaultService;
  public localStorageService: LocalStorageService;
  public saveData: SaveData;
  public configService: ConfigService;
  public ticketsService: TicketsService;
  private translate: TranslateService;
  private utilService: UtilityService;

  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<this>);
  public fb: FormBuilder;
  public ticketForm: FormGroup;
  public userData: any;
  public defaultOption: any;
  protected subscriptions: Subscription[] = [];

  public statusMessage: string;
  public clicked = false;

  constructor(public injector: Injector)
  {
    this.defaultService = injector.get(DefaultService);
    this.localStorageService = injector.get(LocalStorageService);
    this.saveData = injector.get(SaveData);
    this.fb = injector.get(FormBuilder);
    this.configService = injector.get(ConfigService);
    this.ticketsService = injector.get(TicketsService);
    this.translate = injector.get(TranslateService);
    this.utilService = injector.get(UtilityService);
  }

  ngOnInit()
  {
    this.userData = this.localStorageService.get('user');
    this.defaultOption = this.configService.defaultOptions;
    this.ticketForm = this.fb.group({
      Message: ['', [
        Validators.required
      ]],
      Subject: ['', [
        Validators.required
      ]]
    });
    this.subscriptions.push(this.ticketsService.notifyOpenTicket.subscribe(data => {
      if (data)
      {
        this.saveData.clickonButton.next('1');
        this.onClose.emit();
      }
    }));

    if (this.data && this.data.data?.notLogin)
    {
      this.ticketForm.addControl('Email', new FormControl('', [Validators.required, Validators.email]));
    }

    this.subscriptions.push(this.ticketsService.notifyNotLoginOpenTicket$.subscribe(data => {
      if (!data.message)
      {
        this.translate.get("Settings.Email_Send_Success_Message").subscribe((res: string) => {
          this.utilService.showMessageWithDelay(this, [{"statusMessage": res}]).then(() => {
            this.close();
          });
        });
      }
      else {
        this.utilService.showMessageWithDelay(this, [{"statusMessage": data}]);
      }
    }));
  }

  public  submit()
  {
    this.ticketForm.markAllAsTouched();
    if (!this.ticketForm.valid)
    {
      return;
    }
    else {
      let ticket: Ticket = new Ticket();
      ticket.Subject = this.ticketForm.get("Subject").value;
      ticket.Message = this.ticketForm.get("Message").value;
    if (this.data && this.data.data?.notLogin)
      {
        ticket.Email = this.ticketForm.get("Email").value;
        this.ticketsService.CreateNotLoginTicket(ticket);
      }
      else
      {
        this.ticketsService.CreateTicket(ticket);
        this.clicked = true;
        this.translate.get("Ticket.Email_Send_Success_Message").subscribe((res: string) => {
          this.utilService.showMessageWithDelay(this, [{"statusMessage": res}]);
          setTimeout(() => {
            this.onClose.emit();
            this.close();
          }, 2000);
        });
      }
    }
  }
  close()
  {
    this.dialogRef.close();
  }
}
