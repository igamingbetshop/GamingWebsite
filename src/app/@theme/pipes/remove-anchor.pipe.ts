import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'removeAnchor'
})
export class RemoveAnchorPipe implements PipeTransform {
    transform(value: string): string {
        if (!value || !value.includes("#"))
            return value;
        else {
            return value.split("#")[0];
        }
    }
}
