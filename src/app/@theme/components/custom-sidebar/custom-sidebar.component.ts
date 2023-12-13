import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrls: ['./custom-sidebar.component.scss']
})
export class CustomSidebarComponent implements OnInit {

 /* @HostListener('window:blur', ['$event'])
  onWindowBlur(event: any): void {
    this.closeSidebar();
  }*/

  @Input() widthExtension = 'px';
  @Input() styles: any = {width: window.innerWidth};
  @Input() position: 'right' | 'left' = 'left';
  @Input() overlay = false;
  @Input() closeOnOutsideClick = false;
  @Input() closeOnSidebarClick = false;
  screenWidth: string = '300px';

  @Input() set isOpen(value: boolean)
  {
    this._isSidebarOpen = value;
    if (this.closeOnOutsideClick && this.isSidebarOpen) {
      document.body.addEventListener('click', this.outsideClickListener, {capture: true});
    }
  };

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();
  _isSidebarOpen = false;

  constructor(private elRef: ElementRef) {
    const width = getComputedStyle(document.documentElement).getPropertyValue('--m-left-sidebar-width');
    if (width) {
      this.screenWidth = this.styles.width + this.widthExtension;
    }
  }

  ngOnInit() {

  }

  outsideClickListener = (e) => {
    if (!this.ancestorNodeIsSidebar(e.target)) {
      this.closeSidebar();
    }
  };

  get isSidebarOpen() {
    return this._isSidebarOpen
  }

  ancestorNodeIsSidebar(node): boolean {
    if (node && node?.parentElement && node?.parentElement?.className && node?.parentElement?.className.includes('ti_navbar_container')) {
      return true;
    } else if (node) {
      return this.ancestorNodeIsSidebar(node.parentElement)
    }
    return false
  }

  closeSidebar() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isSidebarOpen);
    document.body.removeEventListener('click', this.outsideClickListener, {capture: true});
  }


}
