import { ModuleWithProviders, NgModule } from '@angular/core'
import { ConfigService, WindowWrapper, StorageConfig, UserConfig } from './config.service'
import { StorageService } from './storage.service'
export const getWindow = (): Window => window

@NgModule()
export class StorageModule {
  static forRoot(config?: StorageConfig): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [
        { provide: UserConfig, useValue: config },
        { provide: WindowWrapper, useFactory: getWindow },
        ConfigService,
        StorageService,
      ],
    }
  }
}
export { StorageService, StorageConfig }
