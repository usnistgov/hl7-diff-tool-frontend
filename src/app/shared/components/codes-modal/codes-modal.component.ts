import { Component, OnInit, Input } from "@angular/core";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { NgbButtonLabel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-codes-modal",
  templateUrl: "./codes-modal.component.html",
  styleUrls: ["./codes-modal.component.scss"],
  providers: [DialogService]
})
export class CodesModalComponent implements OnInit {
  srcValuesets = [];
  derivedValuesets = [];
  selectedSrc;
  selectedDerived;

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    console.log(this.config.data.valueset);
    if (this.config.data.valueset) {
      this.srcValuesets = this.config.data.valueset.valuesets.src.value.map(
        v => {
          return { label: v, value: v };
        }
      );
      if (this.config.data.valueset.valuesets.derived[this.config.data.igId]){
        this.derivedValuesets = this.config.data.valueset.valuesets.derived[
          this.config.data.igId
        ].value.map(v => {
          return { label: v, value: v };
        });
      } else {
        this.derivedValuesets = this.config.data.valueset.valuesets.src.value.map(
          v => {
            return { label: v, value: v };
          }
        );
      }
     
      console.log(this.srcValuesets, this.derivedValuesets);
    }
  }
}
