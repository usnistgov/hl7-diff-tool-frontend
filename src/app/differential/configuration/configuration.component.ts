import { Component, OnInit, OnDestroy } from "@angular/core";
import { DifferentialService } from "../../shared/services/differential.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { TreeNode } from "primeng/api";
import { parse, stringify } from "flatted";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  sourceIg;
  report;
  derivedIgs = [];
  configuration = {
    usage: true,
    cardinality: true,
    datatype: true,
    valueset: true,
    predicate: true,
    conformanceStatement: true,
    coConstraint: true,
    name: true,
    segmentRef: true,
    slicing: true,
  };
  selectedConfig;
  summaries = "default";
  summariesFile;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private differentialService: DifferentialService,
    private router: Router
  ) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  uploadSavedReport(event) {
    let self = this;
    let input = event.target;
    for (let index = 0; index < input.files.length; index++) {
      let reader = new FileReader();
      reader.onload = () => {
        // this 'text' is the content of the file

        self.report = {
          name: input.files[index].name,
          data: reader.result.toString(),
        };
      };
      reader.readAsText(input.files[index]);
    }
  }
  removeSavedReport() {
    this.report = null;
  }
  uploadSummariesFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.summariesFile = file;
    }
  }
  removeSummariesFile() {
    this.summariesFile = null;
  }
  uploadSourceIg(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.sourceIg = file;
    }
  }
  removeSourceIg() {
    this.sourceIg = null;
  }
  uploadDerivedIgs(event) {
    let fileList: FileList = event.target.files;
    let files = [];
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let file: File = fileList[i];
        files.push(file);
      }
      this.derivedIgs.push(...files);
    }
  }
  removeDerivedIg(i) {
    this.derivedIgs.splice(i, 1);
  }
  analyze() {
    this.spinner.show();

    let formData: FormData = new FormData();
    let self = this;
    if (this.report) {
      const data = parse(this.report.data);
      self.differentialService.differentialResults = <TreeNode[]>data;
      self.spinner.hide();
      self.router.navigate(["/differential"]);
    }
    if (this.sourceIg && this.derivedIgs.length > 0) {
      formData.append("source", this.sourceIg, this.sourceIg.name);
      this.derivedIgs.forEach((ig, index) => {
        formData.append(`ig${index}`, ig, ig.name);
      });
      formData.append("configuration", JSON.stringify(this.configuration));
      if (this.summaries && this.summariesFile) {
        formData.append(
          "configurationFile",
          this.summariesFile,
          this.summariesFile.name
        );
      }
      this.differentialService
        .calculateDifferential(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            if (data && data.success) {
              self.differentialService.differentialResults = <TreeNode[]>(
                data.data
              );
              console.log(self.differentialService.differentialResults);
              self.spinner.hide();
              self.router.navigate(["/differential"]);
            } else {
              self.spinner.hide();
              this.toastr.error("Error while calculating.");
            }
          },
          (error) => {
            self.spinner.hide();
            this.toastr.error(
              "Error while calculating. Please check profiles structure"
            );
          }
        );
    }
  }
}
