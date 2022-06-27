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
  comparedCodes = [];

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data.valueset) {
      this.srcValuesets = this.config.data.valueset.valuesets.src.value;
      this.derivedValuesets = this.config.data.valueset.valuesets.derived[
        this.config.data.igId
      ].value;
      if(this.srcValuesets.length === 1 ){
        this.selectedSrc = this.srcValuesets[0]
      }
      if(this.derivedValuesets.length === 1 ){
        this.selectedDerived = this.derivedValuesets[0]
      }
      this.derivedChanged(null)

    }
  }

  srcChanged(event) {
    if (this.selectedDerived) {
      this.comparedCodes = this.compareCodes(
        this.selectedSrc.codes,
        this.selectedDerived.codes
      );
    }
  }
  derivedChanged(event) {
    if (this.selectedSrc) {
      this.comparedCodes = this.compareCodes(
        this.selectedSrc.codes,
        this.selectedDerived.codes
      );
    } else {
      this.comparedCodes = this.selectedDerived.codes;
    }
  }
  compareCodes(srcCodes, derivedCodes) {
    let codes = [];
    if (derivedCodes) {
      derivedCodes.forEach(derivedCode => {
        const srcCode = srcCodes.find(
          code =>
            code.value === derivedCode.value &&
            code.codeSystem === derivedCode.codeSystem
        );
        if (srcCode) {
          let code = Object.assign({}, derivedCode);
          if (srcCode.usage !== derivedCode.usage) {
            code.usage = {
              value: derivedCode.usage,
              status: "changed"
            };
          }

          codes.push(code);
        } else {
          //code added
          codes.push({ ...derivedCode, status: "added" });
        }
      });
      srcCodes.forEach(code => {
        const c = derivedCodes.find(
          x => x.codeSystem === code.codeSystem && x.value === code.value
        );
        if (!c) {
          //code deleted
          codes.push({
            ...code,
            status: "deleted"
          });
        }
      });
    }

    return codes;
  }
}
