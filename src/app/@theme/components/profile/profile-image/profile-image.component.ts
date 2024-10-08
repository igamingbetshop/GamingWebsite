import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {BaseApiService} from "@core/services/api/base-api.service";

export type Image = {Url:string, Name:string};
@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  imports: [TranslateModule],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class ProfileImageComponent implements OnInit{

  selectedImage = signal<Image | boolean>(false);
  #dialog = inject(MatDialog);
  #apiService = inject(BaseApiService);

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
        this.selectedImage.set(data);
      }
    });
  }

  #getProfileImage()
  {
    this.#apiService.apiGet("GetProfilePicture").subscribe(data => {

    });
  }
}
