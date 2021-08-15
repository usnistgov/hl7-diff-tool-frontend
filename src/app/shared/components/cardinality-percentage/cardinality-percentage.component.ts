import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cardinality-percentage',
  templateUrl: './cardinality-percentage.component.html',
  styleUrls: ['./cardinality-percentage.component.scss']
})
export class CardinalityPercentageComponent implements OnInit {
  @Input() percentage;
  Object = Object;


  constructor() { }

  ngOnInit(): void {
    console.log(this.percentage)
  }

}
