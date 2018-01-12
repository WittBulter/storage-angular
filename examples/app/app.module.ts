import { NgModule } from '@angular/core'
import { ExAppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    ExAppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ExAppComponent],
})
export class AppModule {
}

