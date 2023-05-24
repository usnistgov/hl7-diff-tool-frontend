import { Component, OnInit, Input } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-conformance-statement-viewer",
  templateUrl: "./conformance-statement-viewer.component.html",
  styleUrls: ["./conformance-statement-viewer.component.scss"],
})
export class ConformanceStatementViewerComponent implements OnInit {
  @Input() conformanceStatements = [];
  @Input() igs;
  @Input() results;

  constructor() {}

  ngOnInit(): void {
    console.log(this.conformanceStatements);
  }
}
