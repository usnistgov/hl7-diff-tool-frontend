import { Component, OnInit, Input } from "@angular/core";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-code-list-modal",
  templateUrl: "./code-list-modal.component.html",
  styleUrls: ["./code-list-modal.component.scss"],
  providers: [DialogService],
})
export class CodeListModalComponent implements OnInit {
  codes = [];

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data.codes) {
      this.codes = this.config.data.codes;
    }
  }
}
