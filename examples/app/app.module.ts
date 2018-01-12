import { NgModule } from '@angular/core'
import { ExAppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { StorageModule, StorageConfig } from '../../src/storage.module'

export const config: StorageConfig = {
  databases: ['www'],
}

@NgModule({
  declarations: [
    ExAppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StorageModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [ExAppComponent],
})
export class AppModule {
}
