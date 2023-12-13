import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";
import {DateTypes} from "@core/enums";

@Pipe({
  name: 'dateLongTime'
})
export class DateLongTypePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any
  {
    return super.transform(value.toString().replace("Z", ""), DateTypes.LONG);
  }
}
