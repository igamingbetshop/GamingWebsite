import {AfterViewInit, Directive, ElementRef, Injector, Renderer2} from '@angular/core';
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";

@Directive()
export class CommonGetTextComponent extends BaseComponent implements AfterViewInit{

  public languages: Array<any> = [];
  public route: ActivatedRoute;
  public pageTitle: string;
  public languageKeys: any;
  public timeout;
  public elem: ElementRef;
  public domNavigationLinks: Array<any>;
  public renderer: Renderer2;
  public router: Router;
  private http: HttpClient;
  private translateService:TranslateService;

  public content:string;

  constructor(public injector: Injector)
  {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.elem = injector.get(ElementRef);
    this.renderer = injector.get(Renderer2);
    this.router = injector.get(Router);
    this.http = injector.get(HttpClient);
    this.translateService = injector.get(TranslateService);

    this.route.params.subscribe((params) =>
    {
      this.pageTitle = params.name;
      this.getPage(params.name);
    });
  }

  ngAfterViewInit()
  {
    this.elem.nativeElement.scrollIntoView();
  }

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
