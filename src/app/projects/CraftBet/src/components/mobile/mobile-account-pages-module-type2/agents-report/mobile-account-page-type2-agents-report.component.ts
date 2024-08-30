import {Component, Injector} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {BaseAgentReportsComponent} from "../../../../../../../@theme/components/common/base-agents-report/base-agent-reports.component";

@Component({
  selector: 'app-mobile-account-page-type2-agents-report',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './mobile-account-page-type2-agents-report.component.html',
  styleUrl: './mobile-account-page-type2-agents-report.component.scss'
})
export class MobileAccountPageType2AgentsReportComponent extends BaseAgentReportsComponent {
  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
