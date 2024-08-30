import {Component, inject, input, OnInit} from '@angular/core';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Promotion} from "@core/models";
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'promotion-content',
    standalone: true,
    imports: [SanitizerModule, TranslateModule, NgClass, FaIconComponent],
    templateUrl: './promotion-content.component.html',
    styleUrls: ['./promotion-content.component.scss']
})
export class PromotionContentComponent implements OnInit {
    promotion = input<any>();
    data = inject(MAT_DIALOG_DATA, {optional: true});
    dialogRef = inject(MatDialogRef<PromotionContentComponent>, {optional: true});
    promotionData: Promotion;

    ngOnInit() {
        this.promotionData = this.data || this.promotion();
    }

    close() {
        this.dialogRef.close(true);
    }
}
