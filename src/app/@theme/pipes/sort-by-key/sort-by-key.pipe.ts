import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortByKey'})

export class SortByKeyPipe implements PipeTransform {
    transform(value: any[], key: string, ascending: boolean = true): any[] {
        if (!Array.isArray(value) || !key) {
            return value;
        }

        return value.sort((a, b) => {
            const aValue = a[key] || '';
            const bValue = b[key] || '';

            const comparison = aValue.localeCompare(bValue);
            return ascending ? comparison : -comparison;
        });
    }
}
