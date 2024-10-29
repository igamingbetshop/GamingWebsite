import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LayoutService} from "@core/services/app/layout.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {take} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {LoaderService} from "@core/services";
import {DeviceDetectorService} from "ngx-device-detector";
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from "jspdf";

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
              private translateService: TranslateService, public elem: ElementRef,
              private loaderService: LoaderService,
              private deviceDetector: DeviceDetectorService) {
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

  onTemplateClick(event:MouseEvent)
  {
    const target = event.target as HTMLElement;
    if(target.id.startsWith("download"))
    {
      this.loaderService.show();
      const path = target.id.split("_")[1];
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      this.http.get(window['debugPath'] + `/assets/html/${path + '_' +  this.translateService.currentLang}.html`, { headers, responseType: 'text'}).pipe(take(1)).subscribe(data =>
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
      });
    } else if (target.id.startsWith('print')) {
      const path = target.id.split("_")[1];
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      this.http.get(window['debugPath'] + `/assets/html/${path + '_' + this.translateService.currentLang}.html`, {
        headers,
        responseType: 'text'
      }).pipe(take(1)).subscribe(data => {
        this.printContent(data);
      });
    }

  }

  public printContent(htmlContent) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeDocument = iframe.contentWindow?.document;
    if (iframeDocument) {
      iframeDocument.open();
      iframeDocument.write(htmlContent);
      iframeDocument.close();
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }

}
