import { Component } from '@angular/core'
import { AppService } from './app.service'
import { StorageService } from '../../src/storage.module'

@Component({
  selector: 'ex-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService],
})
export class ExAppComponent {
  
  constructor(
    private appService: AppService,
    private storage: StorageService,
  ) {
  }
  
  ngOnInit(): void {
  }
  
}
