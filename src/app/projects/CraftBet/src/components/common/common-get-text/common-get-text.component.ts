import {AfterViewInit, Directive, ElementRef, Injector, Renderer2} from '@angular/core';
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from "jspdf";
import {LoaderService} from "@core/services";
import {DeviceDetectorService} from "ngx-device-detector";

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
  private loaderService:LoaderService;
  private deviceDetector:DeviceDetectorService;
  public translate: TranslateService;

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
    this.http = injector.get(HttpClient);
    this.deviceDetector = injector.get(DeviceDetectorService);
    this.loaderService = injector.get(LoaderService);
    this.translate = injector.get(TranslateService);


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

  onTemplateClick(event:MouseEvent)
  {
    const target = event.target as HTMLElement;
    if(target.id.startsWith("download"))
    {
      this.loaderService.show();
      const path = target.id.split("_")[1];
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      this.http.get(window['debugPath'] + `/assets/html/${path + '_' +  this.translate.currentLang}.html`, { headers, responseType: 'text'}).pipe(take(1)).subscribe(data =>
      {
        if(this.deviceDetector.isMobile() || this.deviceDetector.isTablet())
        {
          let doc = new jsPDF('p', 'pt');
          doc.fromHTML(data, 10, 10, {
            'width': 200
          });
          doc.save(path + '.pdf');
          this.loaderService.hide();
        }
        else
        {
          const opt = {
            filename: path,
            margin:10,
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            image: {
              type: "jpeg",
              quality: 1.0,
            },
            html2canvas: {
              scale: 1.5,
              dpi: 192,
              letterRendering: true,
              allowTaint: true,
            },
            jsPDF: {
              unit: "mm",

              format: [260, 280],
              orientation: "landscape",
              compress: true,
            }
          }
          html2pdf().set(opt).from(data).save().then(data => {
            this.loaderService.hide();
          });
        }

      });
    }

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
