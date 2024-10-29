import {
    ApplicationRef,
    Component,
    ComponentRef,
    computed,
    EventEmitter,
    inject,
    OnInit,
    Output,
    signal
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DropdownDirectiveModule} from "../../../directives/dropdown/dropdown-directive.module";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TooltipDirective} from "../../../directives/tooltip";
import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
    selector: 'betting-history',
    templateUrl: './betting-history.component.html',
    styleUrls: ['./betting-history.component.scss'],
    standalone:true,
    imports: [CommonModule, RouterModule, TranslateModule, DropdownDirectiveModule, FaIconComponent, TooltipDirective, CdkDrag],
})
export class BettingHistoryComponent  implements OnInit
{
    @Output() close = new EventEmitter<void>();
    filterItems = signal<any>(['All', 'Bets', 'Race', 'hide']);
    selectedFilterItem = signal<any>(this.filterItems()[2]);

    ngOnInit() {


   }

    selectFilterItem(filterItem: number) {
        this.selectedFilterItem.set(filterItem);
        if(this.selectedFilterItem() === 'hide'){
            this.close.emit();
        }
    }

    closeComponent() {
        this.close.emit();
    }
}
