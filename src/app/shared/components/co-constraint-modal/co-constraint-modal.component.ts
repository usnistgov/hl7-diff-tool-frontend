import { Component, OnInit, Input } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-co-constraint-modal",
  templateUrl: "./co-constraint-modal.component.html",
  styleUrls: ["./co-constraint-modal.component.scss"],
  providers: [DialogService],
})
export class CoConstraintModalComponent implements OnInit {
  tables;
  srcTable;
  igs;
  results;

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.tables = this.config.data.tables;
    this.srcTable = this.config.data.srcTable;
    console.log(this.tables, this.srcTable);
    this.igs = this.config.data.igs;
    this.results = this.config.data.results;
  }
}
