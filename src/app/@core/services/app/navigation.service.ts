import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Injectable()
export class NavigationService
{
    isFirstTime = true;
    constructor(private router:Router)
    {
        /*This should replace*/
        localStorage.setItem('casinoFilterGame', null);
        router.events.subscribe(event =>
        {
            if (event instanceof NavigationEnd)
            {
                this.initialNavigation(event.url);
            }
            if (event instanceof NavigationStart)
            {
                if(event.url == '/login')
                {
                    localStorage.setItem('product-url', this.router.url);
                }
            }
        });
    }

    initialNavigation(initialUrl:string)
    {
        if(initialUrl === '/')
        {
            const productUrl = localStorage.getItem("product-url");
            const defaultUrl = localStorage.getItem("defaultRoute");
            if (productUrl !== null)
            {
                initialUrl = productUrl;
                localStorage.removeItem('product-url');
            }
            else if(defaultUrl)
                initialUrl = defaultUrl;
            if(initialUrl !== '/')
                this.router.navigateByUrl(initialUrl);
        }
    }

}
