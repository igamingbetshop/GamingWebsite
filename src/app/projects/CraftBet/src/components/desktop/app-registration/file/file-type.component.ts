import {Component, forwardRef} from '@angular/core';
import {BaseFile} from "../../../../../../../@theme/components/register/types/base-file.";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileTypeComponent),
      multi: true
    }
  ]
})
export class FileTypeComponent extends BaseFile {



}
