import { Component, OnInit, Input } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";
import { CoConstraintModalComponent } from "../co-constraint-modal/co-constraint-modal.component";

@Component({
  selector: "app-co-constraint-viewer",
  templateUrl: "./co-constraint-viewer.component.html",
  styleUrls: ["./co-constraint-viewer.component.scss"],
  providers: [DialogService],
})
export class CoConstraintViewerComponent implements OnInit {
  @Input() coConstraints = [];
  @Input() igs;
  @Input() results;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}
  showCoConstraints(table, srcTable) {
    const ref = this.dialogService.open(CoConstraintModalComponent, {
      header: "Co-constraints",
      width: "100%",
      height: "600px",
      data: {
        tables: table,
        srcTable: srcTable,
        igs: this.igs,
        results: this.results,
      },
    });
    ref.onClose.subscribe((c) => {
      if (c) {
      }
    });
  }
}
