import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-usage-percentage",
  templateUrl: "./usage-percentage.component.html",
  styleUrls: ["./usage-percentage.component.scss"]
})
export class UsagePercentageComponent implements OnInit {
  @Input() percentage;
  Object = Object;
  list = [];

  constructor() {}

  ngOnInit(): void {

  }
}
