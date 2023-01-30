import { Component, OnInit, Input } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { CodesModalComponent } from "../codes-modal/codes-modal.component";

@Component({
  selector: "app-comparison-modal",
  templateUrl: "./comparison-modal.component.html",
  styleUrls: ["./comparison-modal.component.scss"],
  providers: [DialogService],
})
export class ComparisonModalComponent implements OnInit {
  profile;
  results;
  igs;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.profile = this.config.data.profile;
    this.results = this.config.data.results;
    this.igs = this.config.data.igs;
  }
}
