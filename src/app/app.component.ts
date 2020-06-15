import { Component, Input } from '@angular/core';

export interface Card{
  mainCity: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  cards: Card[] = [
    {mainCity: 'Kiev'},
    {mainCity: 'Bali'},
    {mainCity: 'Washington'}
    
  ]
  
}
