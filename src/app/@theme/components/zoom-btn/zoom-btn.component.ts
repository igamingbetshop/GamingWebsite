import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'zoom-btn',
  templateUrl: './zoom-btn.component.html',
  styleUrls: ['./zoom-btn.component.scss']
})

export class ZoomBtnComponent implements OnInit, OnDestroy {

  @Input() itemClassname: string;
  @Input() menuItem: any;

  currentZoom:number = 100;

  constructor()
  {

  }


  increment()
  {
    this.currentZoom += 10;
    document.body.style['zoom'] = `${this.currentZoom}%`;
  }

  decrement()
  {
    if( this.currentZoom !== 0)
    {
      this.currentZoom -= 10;
      document.body.style['zoom'] = `${this.currentZoom}%`;
    }
  }

  reset()
  {
    this.currentZoom = 100;
    document.body.style['zoom'] = null;
  }

  ngOnInit()
  {

  }

  ngOnDestroy()
  {

  }

}
