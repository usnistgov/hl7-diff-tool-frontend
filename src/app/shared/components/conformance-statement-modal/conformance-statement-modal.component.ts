import { Component, OnInit, Input } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef
} from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-conformance-statement-modal",
  templateUrl: "./conformance-statement-modal.component.html",
  styleUrls: ["./conformance-statement-modal.component.scss"],
  providers: [DialogService]
})
export class ConformanceStatementModalComponent implements OnInit {
  conformanceStatements = [];
  igs;
  results

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.conformanceStatements = this.config.data.conformanceStatements;
    this.igs = this.config.data.igs;
    this.results = this.config.data.results;


  }


}
