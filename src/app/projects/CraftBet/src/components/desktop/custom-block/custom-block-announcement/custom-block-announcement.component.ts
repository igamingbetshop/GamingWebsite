import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {AppCommonAnnouncementComponent} from "../../../common/app-common-announcement/app-common-announcement.component";
import * as jsPDF from "jspdf";

@Component({
  selector: 'app-custom-block-announcement',
  templateUrl: './custom-block-announcement.component.html'
})
export class CustomBlockAnnouncementComponent extends AppCommonAnnouncementComponent {

  @ViewChild('content') content: ElementRef;

  tabsName = [
    {
      'id': 1,
      'routeName': 'betList',
      'pageName': 'betList',
      'icon': 'icon-top-panel-bet-list'
    },
    {
      'id': 2,
      'routeName': 'betting-statement',
      'pageName': 'statement',
      'icon': 'icon-top-panel-statement'
    },
    {
      'id': 3,
      'routeName': 'settings',
      'pageName': 'settings',
      'icon': 'icon-top-panel-settings'
    },
    {
      'id': 4,
      'routeName': 'announcement',
      'pageName': 'announcement',
      'icon': 'icon-top-panel-announcements'
    }
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public savePDF(): void {
    let DATA = this.content.nativeElement;

    let doc = new jsPDF('p', 'pt', 'a4');

    let handleElement = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 15, 15, {
      'width': 200,
      'elementHandlers': handleElement
    });


    doc.save('test.pdf');
  }

}
