import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-data-badge',
  templateUrl: './data-badge.component.html',
  styleUrls: ['./data-badge.component.scss']
})
export class DataBadgeComponent implements OnInit {

  @Input() type;
  constructor() { }

  ngOnInit(): void {
  }

 

}
