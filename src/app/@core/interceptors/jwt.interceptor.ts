import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import {finalize, tap} from 'rxjs';
import {ConfigService, LoaderService, LocalStorageService} from "@core/services";
import {LogoutHelper} from "@core/services/helpers/logout.helper";
import {Router} from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class JWTInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(
        private logoutHelper: LogoutHelper,
        private localStorageService: LocalStorageService,
        private config:ConfigService,
        private loaderService: LoaderService,
        private router: Router,
    ) {}

    removeRequest(req: HttpRequest<any>)
    {
        this.requests = this.requests.filter(request => request !== req);
        if(this.requests.length > 0)
            this.loaderService.show();
        else this.loaderService.hide();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        this.requests.push(req);
        if(req.body?.Loading !== false)
        {
            this.loaderService.show();
        }
        delete req.body?.Loading;

        return next.handle(req)
            .pipe(
                tap({
                    // Succeeds when there is a response; ignore other events
                    next: (event) => {
                        if(event instanceof HttpResponse)
                        {
                            if (event.body.ResponseCode === 28 || event.body.ResponseCode === 29)
                            {
                                if (event.body.ResponseCode === 28 || event.body.ResponseCode === 29)
                                {
                                    const userData = this.localStorageService.get('user');
                                    if (userData)
                                    {
                                        this.logoutHelper.logout(event.body.ResponseObject ? event.body.ResponseObject : '');
                                    }
                                }
                                else if (event.body.ResponseCode === 138) {
                                    this.router.navigate(['/403-error'], {queryParams: {error: 1}});
                                }
                            }
                        }
                    },
                    // Operation failed; error is an HttpErrorResponse
                    error: (error) => {
                    }
                }),
                // Log when response observable either completes or errors
                finalize(() => {
                    this.removeRequest(req);
                })
            );
    }
}
