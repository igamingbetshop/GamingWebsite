import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {AppCommonLoginComponent} from '../../common/app-common-login/app-common-login.component';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '@core/services';


@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent extends AppCommonLoginComponent {
  @Input() mainClass: string;
  @Input() sectionClass: string;
  @Input() contentType: string;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter<any>();

  public configService: ConfigService;
  public defaultOptions: any;

  public logoUrl: string = '';

  constructor(public injector: Injector, private route: ActivatedRoute) {
    super(injector);
    this.configService = injector.get(ConfigService);
  }

  navigateToForgot(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.onNavigate.emit();
  }

  errorHandler(event) {
    event.target.src = '../../../../../../../assets/images/logo.png';
  }

  ngOnInit() {
    super.ngOnInit();
    this.defaultOptions = this.configService.defaultOptions;
  }

}
