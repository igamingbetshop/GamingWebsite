import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatDialogRef} from "@angular/material/dialog";
import {NgOptimizedImage} from "@angular/common";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {take} from "rxjs";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Image} from "../profile-image/profile-image.component";

@Component({
  selector: 'edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
  imports: [TranslateModule, FaIconComponent, NgOptimizedImage],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:[GetSettingsInfoService]
})

export class EditImageComponent implements OnInit{

  images = signal<Image[]>(Array.from({ length: 19 }, (_, i) => {
    const index = i + 1;
    return {Url:`${window['debugPath']}/assets/images/avatar${index}.png`, Name:`avatar${index}`}
  }));
  selectedImage = signal<Image>(this.images()[0]);
  fileRef = viewChild<HTMLInputElement>("fileRef");
  errorTxt = signal<string>("");
  #dialogRef = inject(MatDialogRef);
  #getSettingsInfoService = inject(GetSettingsInfoService);
  #apiService = inject(BaseApiService);
  #destroyRef = inject(DestroyRef);

  ngOnInit()
  {

  }

  selectImage(image:Image)
  {
    this.selectedImage.set(image);
  }

  onSelectFile(e:Event)
  {
    this.#getSettingsInfoService.notifyGetChooseFileName$.pipe(take(1)).subscribe(data => {
      this.#getSettingsInfoService.uploadDocument(8);
      this.#getSettingsInfoService.notifyGetDocumentUploadResponseMessage$.pipe(take(1)).subscribe(data => {
          if(data.className === "error_message")
            this.#showErrorTxt(data.message);
          else
          {
            this.#getProfileImage();
          }
      });
    })
    this.#getSettingsInfoService.uploadFile(e);
    this.#resetFile();
  }

  uploadSelectedImage()
  {
    const imgElement:HTMLImageElement = document.getElementById(this.selectedImage().Name) as HTMLImageElement;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;

    ctx.drawImage(imgElement, 0, 0);

    const base64Image = canvas.toDataURL('image/png');

    const payload = {
      ImageData:  base64Image.substring(base64Image.indexOf(',') + 1),
      Name:`${this.selectedImage().Name}.png`,
      Extension:'png',
      ClientId:'',
      Status:'',
      DocumentTypeId:''
    };

    this.#getSettingsInfoService.uploadObj = payload;
    this.#getSettingsInfoService.uploadDocument(8);

  }

  close(data?:any)
  {
    this.#dialogRef.close(data);
  }

  #resetFile()
  {
    if(this.fileRef)
    {
      this.fileRef().value = "";
    }
  }

  #showErrorTxt(message:string)
  {
    this.errorTxt.set(message);
    const p = setTimeout(() => {
      this.errorTxt.set("");
      clearTimeout(p);
    }, 3000)
  }

  #getProfileImage()
  {
    this.#apiService.apiGet("GetProfilePicture").subscribe(data => {
        this.close(data);
    });
  }

}
