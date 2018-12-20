import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.scss']
})
export class ArrivalsComponent implements OnInit {
  @Input() arrivals: any;
  @Input() line: any;
  constructor() { }

  ngOnInit() {
  }

}
