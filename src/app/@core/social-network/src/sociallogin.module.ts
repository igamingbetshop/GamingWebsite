import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialAuthService, AuthServiceConfig } from './social-auth.service';

export function configFactory(config: AuthServiceConfig) {
  return config;
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SocialAuthService
  ]
})
export class SocialLoginModule {

  public static initialize(config: AuthServiceConfig): ModuleWithProviders<SocialLoginModule> {
    return {
      ngModule: SocialLoginModule,
      providers: [
        SocialAuthService,
        {
          provide: AuthServiceConfig,
          useValue: config
        }
      ]
    };
  }

}
