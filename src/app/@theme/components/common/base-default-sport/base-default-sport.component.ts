import {OnInit, Injector, Directive} from '@angular/core';
import {SaveData} from "../../../../@core/services/app/saveData.service";

@Directive()
export class BaseDefaultSportComponent implements OnInit {

  saveData: SaveData;

  constructor(public injector: Injector) {
    this.saveData = injector.get(SaveData);
  }

  ngOnInit() {

    this.saveData.changeUrlName.subscribe((data: string) => {

      let cut_str = data.substring(data.lastIndexOf("/") + 1);

      const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;
      if (data) {
        if (iframe && iframe.contentWindow)
        {
          iframe.contentWindow.postMessage({"from": "website", "openRoute": cut_str}, "*");
        }
      }
    });
  }

}
