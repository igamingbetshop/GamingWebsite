import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LayoutService} from "@core/services/app/layout.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {take} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-mobile-information',
  templateUrl: './mobile-information.component.html',
  styleUrls: ['./mobile-information.component.scss']
})
export class MobileInformationComponent implements OnInit {
  public domNavigationLinks: Array<any>;
  public content:string;
  public timeout;
  constructor(public route: ActivatedRoute, public layoutService:LayoutService,
              public renderer: Renderer2,
              public router: Router,
              private http: HttpClient,
              private translateService:TranslateService ,public elem: ElementRef) {
    this.route.params.subscribe((params) =>
    {
      this.getPage(params.productId);
    });
  }

  ngOnInit() {}
  private getPage(pageName)
  {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.http.get(window['debugPath'] + `/assets/html/${pageName + '_' +  this.translateService.currentLang}.html`, { headers, responseType: 'text'}).pipe(take(1)).subscribe(data =>
    {
      this.content = data;
      this.timeout = setTimeout(() => {
        this.domNavigationLinks = this.elem.nativeElement.querySelectorAll('.navigate');
        this.domNavigationLinks.forEach(link => {
          this.renderer.listen(link, 'click', () => {
            this.router.navigate(['/terms']);
          });
        });
        clearTimeout(this.timeout);
      });
    });
  }

}
