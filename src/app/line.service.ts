import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LINES } from './lines'
import { Line } from './line'

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor() { }

  getLines(): Observable<Line[]> {
    return of(LINES);
  }

  getLine(id: string): Observable<Line> {
    return of(LINES.find(line => line.id === id));
  }
}
