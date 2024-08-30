import {Component, inject} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'search-opener',
  templateUrl: './search-opener.component.svg',
  styleUrls: ['./search-opener.component.scss'],
  standalone:true
})
export class SearchOpenerComponent
{
    private dialog = inject(MatDialog);

    async openSearch()
    {
        const {GlobalSearchComponent} = await import('../../../../../../@theme/components/global-search/global-search.component');
        this.dialog.open(GlobalSearchComponent, {data:{options:false},width:'100%', maxWidth:"1200px", position:{top:'70px'}},);
    }
}
