import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  hoverClass: String = '';
  selectedLine: any = {id: '', viewBox: "-40.5 -120.5 2500 1320", keyBox: "translate(1825,965)"};
  constructor() { }

  ngOnInit() {
  }

  onHover(line: String) {
    this.hoverClass = line;
  }
}
