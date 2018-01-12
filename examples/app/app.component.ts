import { Component } from '@angular/core'
import { AppService } from './app.service'

@Component({
  selector: 'ex-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService],
})
export class ExAppComponent {
  
  constructor(
    private appService: AppService,
  ) {
  }
  
  ngOnInit(): void {
  }
  
}
