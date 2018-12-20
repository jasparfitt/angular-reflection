import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit{
  @Input() hoverClass: String;
  @Input() line: any;
  @Output() selectStation = new EventEmitter<any>();
  constructor() { }

  ngOnInit () {}

  hoverOn (line: String) {
    if (this.hoverClass !== 'off') {
      this.hoverClass = line;
    }
  }

  hoverOff ()  {
    if (this.hoverClass !== 'off') {
      this.hoverClass = '';
    }
  }

  onSelectStation(station) {
    this.selectStation.emit(station)
  }
}
