import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
city: any;

  constructor() { }

  ngOnInit(): void {
  }

@Output() messageEvent = new EventEmitter<string>();


sendMessage($event) {
  this.city = $event.target.innerHTML;
  console.log(this.city)
  this.messageEvent.emit(this.city)
}
}
