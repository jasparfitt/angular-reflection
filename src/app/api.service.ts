import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { forkJoin, Observable } from 'rxjs'


@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getDisruptions(line): Promise<any[]>{
    return this.http.get(`https://api.tfl.gov.uk/Line/${line}/Disruption?app_id=ac87b02f&app_key=%2099c5cbe192c6f79e417ccb9adb34be97`)
      .toPromise()
      .then(response => response as any[])
  }

  getStationId(line, selectedStation) {
    return this.http.get(`https://api.tfl.gov.uk/Line/${line}/StopPoints?app_id=ac87b02f&app_key=%2099c5cbe192c6f79e417ccb9adb34be97`)
      .toPromise()
      .then((response: any[]) => {
        let stations = response.map(station => {
          return ({
            name: station.commonName,
            id: station.id
          })
        })
        return stations.find(station => {
          return station.name.toLowerCase() === (selectedStation+' underground station')
        }).id
      });
  }

  getStationTimetableFromId(line, stationId): Promise<any[]>{
      let outbound = this.http.get(`https://api.tfl.gov.uk/Line/${line}/Timetable/${stationId}?direction=outbound&app_id=ac87b02f&app_key=%2099c5cbe192c6f79e417ccb9adb34be97`)
      let inbound  = this.http.get(`https://api.tfl.gov.uk/Line/${line}/Timetable/${stationId}?direction=inbound&app_id=ac87b02f&app_key=%2099c5cbe192c6f79e417ccb9adb34be97`)
      return forkJoin([outbound, inbound])
      .toPromise()
      .then(results => results as any[])
  }

  getStationTimetable(line, station): Promise<any[]> {
    return this.getStationId(line,station)
      .then(stationId => {
        return this.getStationTimetableFromId(line, stationId)
          .then(response => {
            return (response)
          })
      })
  }

  getNextArrivals(line, stationId) {
    return this.http.get(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${stationId}?direction=inbound&app_id=ac87b02f&app_key=%2099c5cbe192c6f79e417ccb9adb34be97`)
      .toPromise()
      .then(response => response as any[])
  }

  getStationsOnLine(line): Promise<any[]> {
    return this.http.get(`https://api.tfl.gov.uk/Line/${line}/StopPoints?app_id=ac87b02f&app_key=%2099c5cbe192c6f79e417ccb9adb34be97`)
      .toPromise()
      .then(response => response as any[])
  }


}
