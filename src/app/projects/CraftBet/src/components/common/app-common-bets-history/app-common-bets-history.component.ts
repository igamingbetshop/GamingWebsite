import {Injectable, Injector} from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {UserInfoComponent} from '../../desktop/user-info/user-info.component';
import {BetsHistoryComponent} from '../../../../../../@theme/components/common/bets-history/bets-history.component';


@Injectable()
export class AppCommonBetsHistoryComponent extends BetsHistoryComponent {

  public simpleModalService: SimpleModalService;


  constructor(public injector: Injector) {
    super(injector);
    this.simpleModalService = injector.get(SimpleModalService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public openInfo(data) {
    this.simpleModalService.addModal(UserInfoComponent, {
      title: 'User-Info',
      message: true,
      data: data
    }).subscribe(() => {});
  }

}
