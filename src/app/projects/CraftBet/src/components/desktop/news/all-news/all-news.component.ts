import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {BaseNewsComponent} from "../../../../../../../@theme/components/common/news/base-news.component";

@Component({
  selector: 'all-news',
  templateUrl: './all-news.component.html'
})
export class AllNewsComponent extends BaseNewsComponent {


  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
