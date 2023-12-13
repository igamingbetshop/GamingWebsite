// import {Injectable} from "@angular/core";
// import {Observable} from "rxjs/Observable";
// import {AuthService} from "../api/auth.service";
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
//
// @Injectable()
// export class JWTInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).catch(err => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 401) {
//           this.authService.getLogout();
//           return Observable.throw(err);
//         }
//         return Observable.throw(err);
//       }
//     });
//   }
// }

// import { Injectable } from "@angular/core";
// import { catchError, } from "rxjs/operators";
// import { Observable, throwError } from 'rxjs';
// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
//
// @Injectable()
// export class JWTInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req)
//       .pipe(
//         catchError(err => {
//           if (err instanceof HttpErrorResponse && err.status === 0) {
//             console.log("Check Your Internet Connection And Try again Later");
//           } else if (err instanceof HttpErrorResponse && err.status === 401) {
//             // auth.setToken(null);
//             // this.router.navigate(['/', 'login']);
//           }
//           return throwError(err);
//         })
//       );
//   }
// }
