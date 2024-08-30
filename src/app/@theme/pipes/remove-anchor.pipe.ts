import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'removeAnchor'
})
export class RemoveAnchorPipe implements PipeTransform {
    transform(value: string): string {
        if (!value || !value.includes("#") || value.includes("sport=65"))
            return value;
        else {
            return value.split("#")[0];
        }
    }
}
