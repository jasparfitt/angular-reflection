import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { LineService } from '../line.service'
import { Line } from '../line'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() hovering = new EventEmitter<string>();
  @Output() selectLine = new EventEmitter<Line>();
  @Input() selectedLine: any;
  lines: Line[];
  constructor(private lineService: LineService) {}

  ngOnInit() {
    this.getLines();
  }

  getLines(): void {
    this.lineService.getLines()
      .subscribe(lines => this.lines = lines);
  }

  onSelectLine(line: Line): void {
    this.selectLine.emit(line);
  }

  hoverOn (line) {
    this.hovering.emit(line);
  }

  hoverOff ()  {
    this.hovering.emit('');
  }
}
