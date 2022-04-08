import { Component, OnInit, OnDestroy } from "@angular/core";
import { DifferentialService } from "../../shared/services/differential.service";
import { Subject } from "rxjs";
import { takeUntil, retry } from "rxjs/operators";
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { parse, stringify } from 'flatted';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as xml2js from 'xml2js';

@Component({
  selector: "app-verification-configuration",
  templateUrl: "./verification-configuration.component.html",
  styleUrls: ["./verification-configuration.component.scss"]
})
export class VerificationConfigurationComponent implements OnInit, OnDestroy {

  sourceIg;
  report;
  derivedIgs = [];
  configuration = {
    usage: true,
    cardinality: true,
    datatype: true,
    valueset: true

  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  srcProfile;
  srcProfilesList = [{ id: "1", label: "Profile 1" }, { id: "2", label: "Profile 2" }];
  derivedProfile
  derivedProfilesList = [{ id: "1", label: "Profile 1" }, { id: "2", label: "Profile 2" }];

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private differentialService: DifferentialService, private router: Router) { }

  ngOnInit() { }
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
          data: reader.result.toString()
        };
      };
      reader.readAsText(input.files[index]);
    }
  }
  removeSavedReport() {
    this.report = null;
  }
  async uploadSourceIg(event) {
    let self = this;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.sourceIg = file;
      let fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const res = await xml2js.parseStringPromise(fileReader.result, {explicitChildren: true, preserveChildrenOrder:true});
        self.srcProfilesList = this.getProfilesFromXML(res);
        console.log(res)
      }
      fileReader.readAsText(this.sourceIg);

    }
  }
  getProfilesFromXML(xml) {
    let res = [];
    if (xml && xml.ConformanceProfile &&
      xml.ConformanceProfile.Messages &&
      xml.ConformanceProfile.Messages[0] &&
      xml.ConformanceProfile.Messages[0].Message) {
      res = xml.ConformanceProfile.Messages[0].Message.map(m => {
        return { id: m['$'].ID, label: m['$'].Name }
      })
    }
    return res;
  }
  removeSourceIg() {
    this.sourceIg = null;
  }
  uploadDerivedIgs(event) {
    let self = this;
    let fileList: FileList = event.target.files;
    let files = [];
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let file: File = fileList[i];
        files.push(file);
        let fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const res = await xml2js.parseStringPromise(fileReader.result);
          self.derivedProfilesList = this.getProfilesFromXML(res);
        }
        fileReader.readAsText(file);
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
      const data = parse(this.report.data)
      self.differentialService.differentialResults = <TreeNode[]>data;
      self.spinner.hide();
      self.router.navigate(['/differential']);
      return;
    }
    if (this.sourceIg && this.derivedIgs.length > 0) {
      formData.append("source", this.sourceIg, this.sourceIg.name);
      this.derivedIgs.forEach((ig, index) => {
        formData.append(`ig${index}`, ig, ig.name);
      });
      formData.append("configuration", JSON.stringify(this.configuration))
      if(this.srcProfile){
        formData.append("srcProfile", this.srcProfile.id)
      }
      if(this.derivedProfile){
        formData.append("derivedProfile", this.derivedProfile.id)
      }


      this.differentialService
        .calculateVerificationDifferential(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          if (data.success) {
            self.differentialService.differentialResults = <TreeNode[]>data.data;
            console.log(self.differentialService.differentialResults)
            self.spinner.hide();
            self.router.navigate(['/differential']);
          }
        }, error => {
          console.log(error)
          self.spinner.hide();
          this.toastr.error(error && error.error && error.error.message ? error.error.message : "Error while calculating. Please check profiles structure")
        });
    }

  }
}
