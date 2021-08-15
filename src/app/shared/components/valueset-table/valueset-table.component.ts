import { Component, OnInit, Input } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { CodesModalComponent } from "../codes-modal/codes-modal.component";

@Component({
  selector: "app-valueset-table",
  templateUrl: "./valueset-table.component.html",
  styleUrls: ["./valueset-table.component.scss"],
  providers: [DialogService]
})
export class ValuesetTableComponent implements OnInit {
  @Input() valueset;
  @Input() source;
  @Input() igId;
  @Input() changed;
  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
  }

  codeViewer() {
    const ref = this.dialogService.open(CodesModalComponent, {
      header: "Codes viewer",
      width: "100%",
      height: "600px",
      data: {
        valueset: this.valueset,
        igId: this.igId
      }
    });
  }
}
