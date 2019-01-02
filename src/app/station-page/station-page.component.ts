import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service'
import { LineService } from '../line.service'

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrls: ['./station-page.component.scss']
})
export class StationPageComponent implements OnInit {
  selectedStation: any;
  selectedStationCode: any;
  selectedLine: any;
  timetable: any;
  stations: any;
  disruptions: any;
  arrivals: any;
  hoverStation: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private lineService: LineService
  ) { }

  ngOnInit() {
    const line = this.route.snapshot.paramMap.get('id');
    const station = this.route.snapshot.paramMap.get('naptan');
    this.getLine(line);
    this.getDisruptions(line);
    this.getStations(line, station);
    this.getTimetable(line, station);
    this.getArrivals(line, station);
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

  onSelectStation(station) {
    console.log('selected the line: ')
    console.log(station.commonName)
    console.log('')
    if (station.commonName === 'Paddington (H&C Line)-Underground') {
      this.selectedStationCode = station.commonName.substr(0, station.commonName.length-12);
    } else if (station.commonName === 'Turnham Green Underground Station' || station.commonName === 'Barons Court Underground Station') {
      this.selectedStationCode = `${station.commonName.substr(0, station.commonName.length-20)} ${this.selectedLine.name}`
    } else {
      this.selectedStationCode = station.commonName.substr(0, station.commonName.length-20);
    }
    this.selectedStation = station
    this.getTimetable(this.selectedLine.id, station.id)
    this.getArrivals(this.selectedLine.id, station.id)
  }

  onSelectLine(line: any) {
    this.selectedLine = line;
    this.getLine(line.id);
    this.getDisruptions(line.id);
    this.getStations(line.id, false);
  }

  getArrivals(line, station): void {
    if (station) {
      this.apiService.getNextArrivals(line, station)
        .then(arrivals => {
          this.arrivals = arrivals.map( arrival => {
            arrival.expectedArrival = new Date(Date.parse(arrival.expectedArrival)).toTimeString();
            arrival.timeToStation = Math.round(arrival.timeToStation/60);
            return(arrival)
          })
          this.arrivals.sort((a, b) => a.timeToStation - b.timeToStation)
        })
    }
  }

  getTimetable(line, station): void {
    if (station) {
      this.apiService.getStationTimetableFromId(line, station)
        .then(response => this.timetable = response)
    }
  }

  getStations(line, stationId): void {
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
      .then(() => {
        if (stationId) {
          let station = this.stations.find( station => station.id === stationId )
          this.selectedStation = station;
          if (station.commonName === 'Paddington (H&C Line)-Underground') {
            this.selectedStationCode = station.commonName.substr(0, station.commonName.length-12);
          } else if (station.commonName === 'Turnham Green Underground Station' || station.commonName === 'Barons Court Underground Station') {
            this.selectedStationCode = `${station.commonName.substr(0, station.commonName.length-20)} ${this.selectedLine.name}`
          } else {
            this.selectedStationCode = station.commonName.substr(0, station.commonName.length-20);
          }
        }
      });
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
}
