import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  @Input() timetable: any[];
  @Input() station: any[];
  @Input() line: any[];
  constructor() { }

  ngOnInit() {
  }

}
