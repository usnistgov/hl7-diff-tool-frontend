import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { CommentsModalComponent } from "../comments-modal/comments-modal.component";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { ConformanceStatementModalComponent } from "../conformance-statement-modal/conformance-statement-modal.component";
import { CoConstraintModalComponent } from "../co-constraint-modal/co-constraint-modal.component";
import { SlicingModalComponent } from "../slicing-modal/slicing-modal.component";

@Component({
  selector: "app-results-wrapper",
  templateUrl: "./results-wrapper.component.html",
  styleUrls: ["./results-wrapper.component.scss"],
  providers: [DialogService],
})
export class ResultsWrapperComponent implements OnInit {
  @Input() profile;
  @Input() results;
  @Input() igs;
  activeTab = "profiles";
  active = 1;
  fullConfigOptions;
  segmentConfigOptions;

  selectedConfiguration;
  showReason = false;
  compliance = false;
  consequential = {
    name: "consequential",
    label: "Consequential",
  };
  removeReason = false;
  consequentialOptions = [
    {
      name: "consequential",
      label: "Consequential",
    },
    {
      name: "non-consequential",
      label: "Non-consequential",
    },
    {
      name: "all-changes",
      label: "All changes",
    },
  ];
  @Output() onClick = new EventEmitter();
  legend = [
    {
      context: "profile",
      label: "Conformance Profile",
    },
    {
      context: "segment",
      label: "Segment",
    },
    {
      context: "datatype_field",
      label: "Datatype (FIELD)",
    },
    {
      context: "datatype_component",
      label: "Datatype (COMPONENT)",
    },
  ];
  faExclamationTriangle = faExclamationTriangle;
  datatypeSummaries = [];
  segmentSummaries = [];

  activeChange;
  activeChangeTitle;
  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.active = 1;
    this.fullConfigOptions = this.results.configuration;
    this.segmentConfigOptions = this.results.configuration.filter(
      (c) => c.name !== "label"
    );

    this.selectedConfiguration = this.results.configuration[0];
    console.log(
      this.results,
      Object.keys(this.profile.summaries.datatypes),
      this.profile.summaries
    );
    if (this.profile.summaries.datatypes) {
      this.datatypeSummaries = Object.keys(
        this.profile.summaries.datatypes
      ).map((key) => {
        let splits = key.split("#");
        return {
          id: key,
          name: splits.join(" to "),
          ...this.profile.summaries.datatypes[key],
        };
      });
    }
    if (this.profile.summaries.segments) {
      this.segmentSummaries = Object.keys(this.profile.summaries.segments).map(
        (key) => {
          let splits = key.split("#");
          return {
            id: key,
            name: splits.join(" to "),
            ...this.profile.summaries.segments[key],
          };
        }
      );
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.active = 1;
    const self = this;
    const derivedProfiles = this.igs.filter(
      (ig) => self.results.srcIg.profileId === ig.profileOrigin && ig.derived
    );
    if (derivedProfiles && derivedProfiles.length > 0) {
      this.removeReason = false;
    } else {
      this.removeReason = true;
    }
  }

  selectProfile(profile) {
    this.onClick.emit(profile);
  }
  navChange(event) {
    if (
      event.nextId !== 1 &&
      event.activeId === 1 &&
      this.selectedConfiguration.name === "label"
    ) {
      this.selectedConfiguration = this.results.configuration[0];
    }
  }

  getBinding(data) {}

  reasonChanged(event) {}
  comment(rowData, param, igId) {
    const ref = this.dialogService.open(CommentsModalComponent, {
      header: "Comments",
      width: "100%",
      height: "600px",
      data: {
        comments: rowData[param].derived[igId].comments,
      },
    });
    ref.onClose.subscribe((c) => {
      if (c) {
        rowData[param].derived[igId].comments = c;
      }
    });
  }
  commentVs(rowData, igId) {
    if (!rowData.bindingsComments) {
      rowData.bindingsComments = {};
    }
    const ref = this.dialogService.open(CommentsModalComponent, {
      header: "Comments",
      width: "100%",
      height: "600px",
      data: {
        comments: rowData.bindingsComments[igId],
      },
    });
    ref.onClose.subscribe((c) => {
      if (c) {
        rowData.bindingsComments[igId] = c;
      }
    });
  }
  showConfStatements(conformanceStatements) {
    const ref = this.dialogService.open(ConformanceStatementModalComponent, {
      header: "Conformance statements",
      width: "100%",
      height: "600px",
      data: {
        conformanceStatements: conformanceStatements,
        igs: this.igs,
        results: this.results,
      },
    });
    ref.onClose.subscribe((c) => {
      if (c) {
      }
    });
  }
  selectDatatypeChange(change) {
    let changesMap = this.profile.summaries.datatypes[change.id].changes;
    this.activeChange = Object.keys(changesMap).map((key) => changesMap[key]);
    this.activeChangeTitle = change.name;
  }
  getActiveChange(change) {
    let changesMap = this.profile.summaries.datatypes[change.id].changes;
    return Object.keys(changesMap).map((key) => changesMap[key]);
  }
  getActiveSegmentChange(change) {
    let changesMap = this.profile.summaries.segments[change.id].changes;
    return Object.keys(changesMap).map((key) => changesMap[key]);
  }
  closeDatatypeChange() {
    this.activeChange = null;
    this.activeChangeTitle = null;
  }

  showSlicing(slicing, ig) {
    const ref = this.dialogService.open(SlicingModalComponent, {
      header: "Slicing viewer",
      width: "100%",
      height: "600px",
      data: {
        ig: ig,
        slicing: slicing,
      },
    });
  }
}
