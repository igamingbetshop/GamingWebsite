import {Directive, inject} from "@angular/core";
import {LocalStorageService} from "@core/services";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";

@Directive()
export class TransactionsContainer {
    menuList: Array<any> = [];
    agentsParamIndex = false;
    localStorageService = inject(LocalStorageService);
    baseControllerService = inject(BaseControllerService);
    userData = this.localStorageService.get('user');

    ngOnInit()
    {
        this.getAgentFromMenuList();
    }

    getAgentFromMenuList() {
        this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
            const source = JSON.parse(JSON.stringify(data));
            this.menuList = [];
            this.menuList = source.filter((item) => item.Type !== 'submenu');
            this.menuList.forEach(el => {
                const agentsTransactionItem = el.SubMenu.find(item => item.Href === 'transactions');
                if (agentsTransactionItem && agentsTransactionItem.StyleType) {
                    const styleTypeItem = JSON.parse(agentsTransactionItem.StyleType);
                    if (styleTypeItem && styleTypeItem.IsAgent) {
                        this.agentsParamIndex = true;
                    }
                }
            });
        });
    }
}