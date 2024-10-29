import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {BaseApiService} from "@core/services/api/base-api.service";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {StateService} from "@core/services/app/state.service";

export type Image = {Url:string, Name:string};
@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  imports: [TranslateModule, SanitizerModule],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class ProfileImageComponent implements OnInit{

  selectedImage = signal<Image | boolean | string>(false);
  #dialog = inject(MatDialog);
  #apiService = inject(BaseApiService);
  #stateService = inject(StateService);

  ngOnInit()
  {
    this.#getProfileImage();
  }

  async openEditMode()
  {
    const {EditImageComponent} = await import('../edit-image/edit-image.component');
    this.#dialog.open(EditImageComponent, {data:{ image: {Url:"", Name:''}}}).afterClosed().subscribe((data:Image) => {
      if(data)
      {
        const url = `${data}&version=${Math.random()}`;
        this.selectedImage.set(url);
        this.#stateService.changeProfileImage(url);
      }
    });
  }

  #getProfileImage()
  {
    this.selectedImage.set(this.#apiService.buildPath("GetProfilePicture"));
  }
}
