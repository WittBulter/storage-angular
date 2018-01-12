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
    this.storage.insert('name', 'witt')
    console.log(this.storage.find('name'))
    
    this.storage.insert('age', '24')
    console.log(this.storage.findAll())
    
    this.storage.remove('name')
    console.log(this.storage.has('name'))
    
  }
  
}
