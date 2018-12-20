import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Line } from '../line'


@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.scss']
})
export class LineDetailsComponent implements OnInit {
  @Input() line: Line;
  @Input() disruptions: any;
  @Output() selectStation = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {  }

  onSelectStation(station) {
    this.selectStation.emit(station)
  }
}
