import {Component, inject, OnInit} from '@angular/core';
import {StateService} from "@core/services/app/state.service";

@Component({
  selector: 'dark-light',
  templateUrl: './dark-light.component.html',
  styleUrls: ['./dark-light.component.scss'],
  standalone:true
})

export class DarkLightComponent implements OnInit {

  stateService = inject(StateService);

  ngOnInit()
  {

  }
}
