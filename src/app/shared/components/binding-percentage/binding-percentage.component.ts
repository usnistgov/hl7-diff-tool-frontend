import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-binding-percentage',
  templateUrl: './binding-percentage.component.html',
  styleUrls: ['./binding-percentage.component.scss']
})
export class BindingPercentageComponent implements OnInit {
  @Input() percentage;
  Object = Object;


  constructor() { }

  ngOnInit(): void {
    console.log(this.percentage)
  }

}
