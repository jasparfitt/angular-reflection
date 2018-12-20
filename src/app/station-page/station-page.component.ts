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
  selectedLine: any;
  timetable: any;
  stations: any;
  disruptions: any;
  arrivals: any;
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

  onSelectStation(station) {
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
      .then(stations => this.stations = stations)
      .then(() => {
        if (stationId) {
          this.selectedStation = this.stations.find( station => station.id === stationId )
        }
      });
  }

  getDisruptions(line): void {
    this.apiService.getDisruptions(line)
      .then(disruptions => this.disruptions = disruptions)
  }

  getLine(line): void {
    this.lineService.getLine(line)
      .subscribe(line => this.selectedLine = line);
  }
}
