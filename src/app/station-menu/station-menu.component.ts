import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-station-menu',
  templateUrl: './station-menu.component.html',
  styleUrls: ['./station-menu.component.scss']
})
export class StationMenuComponent implements OnInit {
  @Input() stations: any;
  @Input() line: any;
  @Input() selectedStation: any;
  @Output() hoveringStation = new EventEmitter<string>();
  @Output() selectStation = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }

  onSelectStation(station): void {
    this.selectStation.emit(station)
    this.selectedStation=station
  }

  hoverOn (station) {
    this.hoveringStation.emit(station);
  }

  hoverOff ()  {
    this.hoveringStation.emit('');
  }
}
