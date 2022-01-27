import { Component, OnInit } from "@angular/core";
import { DifferentialService } from "../../shared/services/differential.service";
import { Router } from "@angular/router";
import { saveAs } from "file-saver";
import { parse, stringify } from "flatted";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
  results;
  selectedProfile;
  selectedIgs;
  selectedItem;
  constructor(
    private differentialService: DifferentialService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.results = this.differentialService.differentialResults;

    if (!this.results) {
      this.router.navigate(["/configuration"]);
    } else {
      this.selectedIgs = this.results.derivedIgs;
    }
  }

  selectProfile(item) {
    this.selectedItem = item.type;
    console.log(this.selectedItem);
    this.selectedProfile = item.profile;

    // if (item.type === "profile") {
    //   this.selectedProfile = item.profile;
    // } else if (item.type === "compliance") {
    //   this.selectedProfile = null;
    // }
  }
  updateConfig() { }

  save() {
    const blob = new Blob([stringify(this.results)], { type: "text/json" });
    saveAs(blob, "IACT_report.json");
  }
  exportHtml() {
    let html = this.startFile();
    html += this.overviewSection();
    html += this.complianceSection();

    // html += this.changesCountTable();
    html += this.usageChangesTable();
    html += this.endFile();

    const blob = new Blob([html], { type: "text/html" });
    saveAs(blob, "IACT_report.html");
  }
  startFile() {
    let html = `<html><head><title>PACT</title>
    <style type="text/css">
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
        padding: 15px;
      }
      table {
        width: 100%;
        display: table;
        text-indent: initial;
        border-spacing: 2px;
        border-color: grey;
        border-spacing: 0px;
      }
      th {
        padding: 0.571em 0.857em;
        border: 1px solid #c8c8c8;
        font-weight: 700;
        color: #333;
        background-color: #f4f4f4;
        font-size: 14px;
      }
      td {
        padding: 0.571em 0.857em;
        background-color: inherit;
        border: 1px solid #c8c8c8;
        text-align: left;
      }
      .badge {
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }
      .entity-badge-dark{
        color: white;
        border: 1px solid #e3e3e3;
     }
      .entity-badge-ig {
        background-color: #b6006a !important;
      }

      .entity-badge-group {
        background-color: #3dc43d !important;
      }

      .entity-badge-segment {
        background-color: #001aff !important;
      }

      .entity-badge-field {
        background-color: #ff9e1e !important;
      }

      .entity-badge-component {
        background-color: #ffd900 !important;
      }

      .entity-badge-subcomponent {
        background-color: #87abf5 !important;
      }

      .entity-badge-datatype {
        background-color: rgb(240, 10, 10) !important;
      }

      .entity-badge-valueset {
        background-color: rgb(255, 0, 200) !important;
      }

      .entity-badge-conformance-profile {
        background-color: rgb(167, 90, 1) !important;
      }

      .added {
        background: #3dc43d !important;
      }

      .changed {
        background: #ff9e1e;
      }

      .deleted {
        background: #b6006a;
      }
    </style>
    <body>
    <div>
      <h1 style="text-align: center;">Profile Aggregate Comparison Tool (PACT)</h1>

      <h2>I. Overview</h2>
    </div>
    `;
    return html;
  }
  endFile() {
    return "</body></html>";
  }
  createReport() {
    let html = "";
    if (this.results.profiles[0]) {
      const profile = this.results.profiles[0];
      html += `
      <div >
          <h3>2. Report</h3>
          <div style="padding: 0 15px;">
              <h4>a. Overview</h4>
              <ul>
                  <li> P-ACT is reporting that <strong>${profile.usageReport.stronger.total}</strong> instances where in the local IG, where the requirements were stronger than recommendations in the National IG </li>
                  <li> P-ACT is reporting that <strong>${profile.usageReport.weaker.total}</strong> instances where in the local IG, where the requirements were weaker than recommendations in the National IG </li>
              
                  </ul>
          </div>
      </div>

      `;

    }
    return html;
  }

  overviewSection() {
    let html = "";
    if (this.results.profiles[0]) {
      const profile = this.results.profiles[0];
      html += `
      <div style="padding: 0 15px;">
          <h3>1. Profiles</h3>
          <div>
            <div>
              <div>Reference</div>
              <ul>
                <li style="font-weight: bold;">${this.results.srcIg.title}</li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div>Comparing</div>
              <ul> 
      `;
      this.results.derivedIgs.forEach(ig => {
        html += `<li style="font-weight: bold;">${ig.title}</li>`;
      });
      html += ` </ul>
              </div>
            </div>`;
      html += this.createReport();
      html += `
           
            <h3>3. Total changes</h3>
            <table>
                  <tr>
                    <th>Profile</th>
                    <th>Total</th>
                    <th>Usage</th>
                    <th>Cardinality</th>
                    <th>Data type</th>
                  </tr>
      `;
      this.results.derivedIgs.forEach(ig => {
        html += `
        <tr>
        <td>
          <div style="display: flex">
            ${ig.title}
          </div>
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].total
            ? profile.summaries.overview[ig.id].total
            : 0
          }
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].usage
            ? profile.summaries.overview[ig.id].usage
            : 0
          }
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].cardinality
            ? profile.summaries.overview[ig.id].cardinality
            : 0
          }
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].datatype
            ? profile.summaries.overview[ig.id].datatype
            : 0
          }
        </td>
      </tr>
        `;
      });
      html += `
          </table>
        </div>
      `;
    }
    console.log(html);
    return html;
  }
  complianceSection() {
    let html = "";
    if (this.results.profiles[0]) {
      const profile = this.results.profiles[0];
      html += `
      <div style="padding: 0 15px;">
          <h3>4. Compliance</h3>
          <div style="padding: 0 15px;">
              <h4>a. Overview</h4>
              <table>
                  <tr>
                    <th>Profile</th>
                    <th>Errors</th>
                    <th>Warnings</th>
                    <th>Informational</th>
                  </tr>
      `;
      this.results.derivedIgs.forEach(ig => {
        html += `
        <tr>
        <td>
          <div style="display: flex">
            ${ig.title}
          </div>
        </td>
        <td>
          ${
          profile.compliance[ig.id].total
            ? profile.compliance[ig.id].total.error
            : 0
          }
        </td>
        <td>
          ${
          profile.compliance[ig.id].total
            ? profile.compliance[ig.id].total.warning
            : 0
          }
        </td>
        <td>
          ${
          profile.compliance[ig.id].total
            ? profile.compliance[ig.id].total.info
            : 0
          }
        </td>

      </tr>
        `;
      });
      html += `
          </table>
        </div>
      `;
      html += `
          <div style="padding: 0 15px;">
              <h4>b. Compliance errors</h4>
              <table>
                  <tr>
                    <th>Name</th>
                    <th>${this.results.srcIg.title}</th>
      `;

      this.results.derivedIgs.forEach(ig => {
        html += `
          <th>${ig.title}</th>        
        `;
      });
      html += `</tr>`;
      if (profile.summaries.complianceErrorTable) {
        let tableData = Object.keys(profile.summaries.complianceErrorTable).map(
          key => profile.summaries.complianceErrorTable[key]
        );
        tableData.forEach(row => {
          html += `
        <tr>
          <td>
            <div style="display: flex">
              ${this.getBadge(row.type)}
              <div style="padding: 2px 6px;">
                ${row.path}.${row.name}
              </div>
            </div>
          </td>
          <td>
            ${row.src}
          </td>
          ${this.getChangeData(row)}
        </tr>
        `;
        });
      } else {
        // add no errors message
      }

      html += `
          </table>
        </div>
      `;
    }
    return html;
  }
  changesCountTable() {
    let html = "";
    if (this.results.profiles[0]) {
      const profile = this.results.profiles[0];
      html = `<div>
                <h3>Count</h3>
                <table>
                  <tr>
                    <th>Profile</th>
                    <th>Total</th>
                    <th>Usage</th>
                    <th>Cardinality</th>
                    <th>Data type</th>
                  </tr>
      `;
      this.results.derivedIgs.forEach(ig => {
        html += `
        <tr>
        <td>
          <div style="display: flex">
            ${ig.title}
          </div>
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].total
            ? profile.summaries.overview[ig.id].total
            : 0
          }
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].usage
            ? profile.summaries.overview[ig.id].usage
            : 0
          }
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].cardinality
            ? profile.summaries.overview[ig.id].cardinality
            : 0
          }
        </td>
        <td>
          ${
          profile.summaries.overview[ig.id].datatype
            ? profile.summaries.overview[ig.id].datatype
            : 0
          }
        </td>
      </tr>
        `;
      });
      html += `
          </table>
        </div>
      `;
    }
    return html;
  }
  usageChangesTable() {
    let html = "";
    if (this.results.profiles[0]) {
      const profile = this.results.profiles[0];
      let tableData = Object.keys(profile.summaries.usageChangesOverview).map(
        key => profile.summaries.usageChangesOverview[key]
      );
      tableData = this.differentialService.sort(tableData, "globalPath");
      html = `<div>
                <h2>II. Usage</h2>
                <table>
                  <tr>
                    <th></th>
                    <th>${this.results.srcIg.title}</th>
      `;
      this.results.derivedIgs.forEach(ig => {
        html += `
          <th>${ig.title}</th>        
        `;
      });
      html += `</tr>`;
      tableData.forEach(row => {
        html += `
        <tr>
          <td>
            <div style="display: flex">
              ${this.getBadge(row.type)}
              <div style="padding: 2px 6px;">
                ${row.path}.${row.name}
              </div>
            </div>
          </td>
          <td>
            ${row.src}
          </td>
          ${this.getChangeData(row)}
        </tr>
        `;
      });

      html += `
          </table>
        </div>
      `;
    }
    return html;
  }
  getChangeData(row) {
    let html = "";
    this.results.derivedIgs.forEach(ig => {
      html += `
        <td> ${row[ig.id] ? row[ig.id] : ""}</td>        
      `;
    });
    return html;
  }
  getBadge(type) {
    switch (type) {
      case "group": {
        return `<span class="badge entity-badge-dark entity-badge-group">G</span>`;
      }
      case "SEGMENT": {
        return `<span class="badge entity-badge-dark entity-badge-segment">S</span>`;
      }
      case "segmentRef": {
        return `<span class="badge entity-badge-dark entity-badge-segment">S</span>`;
      }
      case "field": {
        return `<span class="badge entity-badge-dark entity-badge-field">F</span>`;
      }
      case "component": {
        return `<span class="badge entity-badge-dark entity-badge-component">C</span>`;
      }
      case "subcomponent": {
        return `<span class="badge entity-badge-dark entity-badge-subcomponent">S</span>`;
      }
      default: {
        return "";
      }
    }
  }
}
