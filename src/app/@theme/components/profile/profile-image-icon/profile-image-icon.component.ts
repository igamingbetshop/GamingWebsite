import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {StateService} from "@core/services/app/state.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  #stateService = inject(StateService);
  #destroyRef = inject(DestroyRef);

  ngOnInit()
  {
    this.#getProfileImage();
  }

  #getProfileImage()
  {
    this.src.set(this.#apiService.buildPath("GetProfilePicture"));
    this.#stateService.onProfileImageChange$.pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(data => this.src.set(data));
  }

}
