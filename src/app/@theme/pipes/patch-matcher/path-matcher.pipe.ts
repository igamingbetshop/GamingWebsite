import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'pathMatcher' })

export class PathMatcherPipe implements PipeTransform
{
    transform(href: string, currentPath:string): boolean
    {
        return href == currentPath || (href.split('?')[0] == currentPath.split('?')[0]) || (href.split('#')[0] == currentPath.split('#')[0]);
    }
}
