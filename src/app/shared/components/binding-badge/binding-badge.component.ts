import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-binding-badge',
  templateUrl: './binding-badge.component.html',
  styleUrls: ['./binding-badge.component.scss'],
})
export class BindingBadgeComponent implements OnInit {

  @Input() context;

  constructor() { }

  ngOnInit() {
  }

}
