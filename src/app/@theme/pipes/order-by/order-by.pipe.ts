import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    //if equal checks second property if defined. Second property can be initial order index
    transform(value: any, args?: any, secondProperty?: any): any {
        if(value) {
            return value.sort(function (a, b) {
                if (a[args] === b[args])
                    return secondProperty? (a[secondProperty] - b[secondProperty]): 0;
                if (a[args]< b[args])
                    return -1;
                return 1;
            });
        }
    }
}
