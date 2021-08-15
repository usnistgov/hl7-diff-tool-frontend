import { Component, OnInit } from "@angular/core";
import { DifferentialService } from "../../shared/services/differential.service";
import { Router } from "@angular/router";
import { saveAs } from "file-saver";
import { parse, stringify } from "flatted";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
  results;
  selectedProfile;
  selectedIgs;
  selectedItem;
  constructor(
    private differentialService: DifferentialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.results = this.differentialService.differentialResults;

    if (!this.results) {
      this.router.navigate(["/configuration"]);
    } else {
      this.selectedIgs = this.results.derivedIgs;
    }
  }

  selectProfile(item) {
    this.selectedItem = item.type;
    console.log(this.selectedItem)
    this.selectedProfile = item.profile;

    // if (item.type === "profile") {
    //   this.selectedProfile = item.profile;
    // } else if (item.type === "compliance") {
    //   this.selectedProfile = null;
    // }
  }
  updateConfig() {}

  save() {
    const blob = new Blob([stringify(this.results)], { type: "text/json" });
    saveAs(blob, "IACT_report.json");
  }
}
