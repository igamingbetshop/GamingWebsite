import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {BaseApiService} from "../../../../@core/services/api/base-api.service";

@Component({
  selector: 'profile-image-icon',
  templateUrl: './profile-image-icon.component.html',
  styleUrls: ['./profile-image-icon.component.scss'],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class ProfileImageIconComponent implements OnInit{

  src = signal<string>("");
  #apiService = inject(BaseApiService);

  ngOnInit()
  {
    this.#getProfileImage();
  }

  #getProfileImage()
  {
    this.#apiService.apiGet("GetProfilePicture").subscribe(data => {
       // this.src.set(data);
    });
  }

}
