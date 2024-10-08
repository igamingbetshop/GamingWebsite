import {
    DestroyRef,
    Directive,
    ElementRef,
    inject,
    OnInit,
    output,
    signal,
    ViewChild,
    WritableSignal
} from "@angular/core";
import {GetSettingsInfoService} from "../../../../@core/services/app/getSettingsInfo.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

type DocumentType = {Id:number, Name:string}

@Directive()
export class BaseDocumentVerification implements OnInit
{
    @ViewChild('frontSideRef') frontSideRef:HTMLInputElement;
    @ViewChild('backSideRef') backSideRef:HTMLInputElement;
    onBack = output<boolean>();
    frontSideFile: File | null = null;
    backSideFile: File | null = null;

    documentTypes = signal<DocumentType[]>([]);
    selectedDocumentType = signal<DocumentType | null>(null);

    frontSidePreview = signal<string | ArrayBuffer>('');
    backSidePreview = signal<string | ArrayBuffer>('');

    validated = signal<boolean>(false);

    #settingsService = inject(GetSettingsInfoService);
    #destroyRef = inject(DestroyRef);

    ngOnInit()
    {
        this.#settingsService.onUserDocuments$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(documents => {
            this.documentTypes.set(documents);
            this.selectedDocumentType.set(this.documentTypes()[0]);
        });
        this.#settingsService.documentTypes();
        this.#destroyRef.onDestroy(() => {
            this.clearFile('front', null);
            this.clearFile('back', null);
        });
    }

    onFileSelect(event: any, side: string)
    {
        const file = event.target.files[0];
        if (file)
        {
            if (side === 'front')
            {
                this.frontSideFile = file;
                this.#readFile(file, this.frontSidePreview);
            }
            else if (side === 'back')
            {
                this.backSideFile = file;
                this.#readFile(file, this.backSidePreview);
            }
        }

    }

    clearFile(side:string, event:MouseEvent)
    {
        if(event)
        {
            event.stopPropagation();
            event.stopImmediatePropagation();
        }

        if(side === 'front')
        {
            this.frontSidePreview.set('');
            this.frontSideFile = null;
            this.frontSideRef.value = "";
        }
        else
        {
            this.backSidePreview.set('');
            this.backSideFile = null;
            this.backSideRef.value = "";
        }
        return false;
    }

    submit()
    {
        this.validated.set(true);

        if(this.frontSideFile && this.backSideFile && this.selectedDocumentType())
        {
            alert("ok")
        }
    }

    #validateFields()
    {
        this.validated.set(true);
    }

    #readFile(file:File, src:WritableSignal<string | ArrayBuffer>)
    {
        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            src.set(event.target.result);
        });

        reader.readAsDataURL(file);
    }
}