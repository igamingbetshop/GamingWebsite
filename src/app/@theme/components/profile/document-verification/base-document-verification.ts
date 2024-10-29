import {
    computed,
    DestroyRef,
    Directive,
    inject,
    OnInit,
    output,
    signal,
    ViewChild,
    WritableSignal
} from "@angular/core";
import {GetSettingsInfoService} from "../../../../@core/services/app/getSettingsInfo.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";

type DocumentType = {Id:number, Name:string}

@Directive()
export class BaseDocumentVerification implements OnInit
{
    @ViewChild('frontSideRef') frontSideRef:HTMLInputElement;
    @ViewChild('backSideRef') backSideRef:HTMLInputElement;
    @ViewChild('fileRef') fileRef:HTMLInputElement;
    onBack = output<boolean>();
    onUploadKYC = output<boolean>();
    frontSideFile: File | null = null;
    backSideFile: File | null = null;
    singleFile: File | null = null;

    documentTypes = signal<DocumentType[]>([]);
    selectedDocumentTypeId = signal<number | null>(null);

    frontSidePreview = signal<string | ArrayBuffer>('');
    backSidePreview = signal<string | ArrayBuffer>('');
    filePreview = signal<string | ArrayBuffer>('');

    validated = signal<boolean>(false);

    #settingsService = inject(GetSettingsInfoService);
    #destroyRef = inject(DestroyRef);
    #apiService = inject(BaseApiService);
    #singleDocs:DocumentType[] = [{Id:1, Name:'Passport'}];
    isSingleDoc = computed(() => !!this.#singleDocs.find(doc => this.selectedDocumentTypeId() === doc.Id));

    ngOnInit()
    {
        this.#settingsService.onUserDocuments$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(documents => {
            this.documentTypes.set(documents);
            this.selectedDocumentTypeId.set(this.documentTypes()[0].Id);
        });
        this.#settingsService.documentTypes();
        this.#destroyRef.onDestroy(() => {
            this.clearFile(null,'front');
            this.clearFile(null,'back');
            this.clearFile(null);
        });
    }

    selectDocumentType(element:EventTarget | null)
    {
        const type = Number((element as HTMLSelectElement).value);
        this.selectedDocumentTypeId.set(type);
    }

    onFileSelect(event: any, side: string = null)
    {
        const file = event.target.files[0];
        if (file)
        {
            const onFileSelection = (fileVariable: string, previewVariable: any) => {
                this[fileVariable] = file;
                this.#readFile(file, previewVariable);
            };

            if (side === 'front') {
                onFileSelection('frontSideFile', this.frontSidePreview);
            } else if (side === 'back') {
                onFileSelection('backSideFile', this.backSidePreview);
            } else {
                onFileSelection('singleFile', this.filePreview);
            }
        }
    }

    clearFile(event:MouseEvent, side:string = null)
    {
        if (event) {
            event.stopImmediatePropagation();
        }

        const clearSide = (previewRef:any, fileRef:any, fileVariable:any) => {

            if( previewRef)
                previewRef.set('');

            this[fileVariable] = null;

            if(fileRef)
                fileRef.value = '';
        };

        if (side === 'front') {
            clearSide(this.frontSidePreview, this.frontSideRef, 'frontSideFile');
        } else if (side === 'back') {
            clearSide(this.backSidePreview, this.backSideRef, 'backSideFile');
        } else {
            clearSide(this.filePreview, this.fileRef, 'singleFile');
        }

        return false;
    }

    submit()
    {
        this.validated.set(true);

        const hasSingleDocFiles = this.isSingleDoc() && this.singleFile;
        const hasFrontAndBackFiles = this.frontSideFile && this.backSideFile;
        const documentTypeId = this.selectedDocumentTypeId();

        if((hasSingleDocFiles || hasFrontAndBackFiles) && documentTypeId)
        {
            const req:any = {
                DocumentTypeId:this.selectedDocumentTypeId()
            }

            if(this.isSingleDoc())
            {
                req.Name = this.singleFile.name;
                req.Extension = this.singleFile.name.split('.').pop();
                req.ImageData = this.filePreview().toString().split(',').pop();
            }
            else
            {
                req.Name = this.frontSideFile.name;
                req.Extension = this.frontSideFile.name.split('.').pop();
                req.ImageFrontData = this.frontSidePreview().toString().split(',').pop();
                req.ImageBackData = this.backSidePreview().toString().split(',').pop();
            }

            this.#apiService.apiRequest(req, Controllers.CLIENT, Methods.UPLOAD_KYC_DOCUMENT).subscribe(data => {
                if(data.ResponseCode === 0)
                    this.onUploadKYC.emit(true);
                else
                {
                    //implement error case;
                }
            });
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