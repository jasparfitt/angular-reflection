import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LineService } from '../line.service'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-line-page',
  templateUrl: './line-page.component.html',
  styleUrls: ['./line-page.component.scss']
})
export class LinePageComponent implements OnInit {
  @Output() selectStation = new EventEmitter<any>();
  selectedLine: any;
  disruptions: any;
  stations: any;
  hoverStation: any;
  constructor(
    private route: ActivatedRoute,
    private lineService: LineService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const line = this.route.snapshot.paramMap.get('id');
    this.getLine(line);
    this.getDisruptions(line);
    this.getStations(line);
  }

  onHover(station) {
    if (station === 'Paddington (H&C Line)-Underground') {
      this.hoverStation = station.substr(0, station.length-12);
    } else if (station === 'Turnham Green Underground Station' || station === 'Barons Court Underground Station') {
      this.hoverStation = `${station.substr(0, station.length-20)} ${this.selectedLine.name}`
    } else {
      this.hoverStation = station.substr(0, station.length-20);
    }
  }

  onSelectLine(line: any) {
    this.selectedLine = line;
    this.getLine(line.id);
    this.getDisruptions(line.id);
    this.getStations(line.id);
  }

  getStations(line): void {
    this.apiService.getStationsOnLine(line)
      .then(stations => {
        if (line === 'metropolitan') {
          let index = stations.findIndex(station => {
            return station.commonName === 'Willesden Green Underground Station'
          })
          stations.splice(index, 1)
          this.stations = stations
        } else {
          this.stations = stations
        }
      })
  }

  getDisruptions(line): void {
    this.apiService.getDisruptions(line)
      .then(disruptions => {
        disruptions = disruptions.filter(function(item, pos, self) {
        return self.findIndex(element => {
          return element.description === item.description;
        }) == pos;
      })
        this.disruptions = disruptions
      })
  }

  getLine(line): void {
    this.lineService.getLine(line)
      .subscribe(line => this.selectedLine = line);
  }

  onSelectStation(station: any) {
    this.selectStation.emit(station)
  }
}
