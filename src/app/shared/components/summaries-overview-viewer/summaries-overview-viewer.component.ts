import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { DifferentialService } from "../../services/differential.service";
import { CodeListModalComponent } from "../code-list-modal/code-list-modal.component";
import { CodesModalComponent } from "../codes-modal/codes-modal.component";
import { ComparisonModalComponent } from "../comparison-modal/comparison-modal.component";

@Component({
  selector: "app-summaries-overview-viewer",
  templateUrl: "./summaries-overview-viewer.component.html",
  styleUrls: ["./summaries-overview-viewer.component.scss"],
  providers: [DialogService],
})
export class SummariesOverviewViewerComponent implements OnInit {
  @Input() profiles;
  @Input() igs;
  @Input() srcIg;
  Object = Object;
  usageChangesTable;
  oUsagesTable;
  pUsageVSTable;
  profilesChangesTable;

  @Output() onClick = new EventEmitter();
  legend = [
    {
      context: "error",
      label: "Error",
      description: "Not allowable and needs intensive follow-up.",
      color: "#ffc6cd",
    },
    {
      context: "warning",
      label: "Warning",
      description: "Potentially not allowable and needs moderate follow-up.",
      color: "#ffeb9c",
    },
    {
      context: "informational",
      label: "Informational",
      description: "Different than what’s in the guide, but is allowable.",
      color: "#c5f0cd",
    },
  ];
  sortingList = [
    { label: "Alphabetically", value: "path" },
    { label: "By position", value: "globalPath" },
  ];
  filterList = [
    { label: "Group", value: "group" },
    { label: "Segment", value: "segmentRef" },
    { label: "Field", value: "field" },
    { label: "Component", value: "component" },
    { label: "Subcomponent", value: "subcomponent" },
  ];
  changedOptions = [
    { label: "Show unchanged values", value: "unchanged" },
    { label: "Hide unchanged values", value: "total" },
  ];
  selectedChangedOption = this.changedOptions[0];
  showUnchanged = true;
  selectedSort = this.sortingList[1];
  selectedFilter = this.filterList;
  usageSearch;
  summariesOverview;
  constructor(
    public dialogService: DialogService,
    private differentialService: DifferentialService
  ) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.profiles);
    this.profiles.forEach((profile) => {
      this.usageChangesTable = Object.keys(
        profile.summaries.usageChangesOverview
      ).map((key) => profile.summaries.usageChangesOverview[key]);
      this.usageChangesTable = this.differentialService.sort(
        this.usageChangesTable,
        this.selectedSort.value
      );
      this.oUsagesTable = Object.keys(profile.summaries.elementsWithOUsage).map(
        (key) => profile.summaries.elementsWithOUsage[key]
      );
      this.oUsagesTable = this.differentialService.sort(
        this.oUsagesTable,
        this.selectedSort.value
      );
      this.pUsageVSTable = Object.keys(profile.summaries.VSWithPUsage).map(
        (key) => profile.summaries.VSWithPUsage[key]
      );
      console.log(this.pUsageVSTable);

      this.summariesOverview = profile.summaries.overview;
      console.log(this.oUsagesTable);
    });
  }
  sortChanged(event) {
    this.usageChangesTable = this.differentialService.sort(
      this.usageChangesTable,
      this.selectedSort.value
    );
    this.oUsagesTable = this.differentialService.sort(
      this.oUsagesTable,
      this.selectedSort.value
    );
    this.igs.forEach((ig) => {
      if (this.profilesChangesTable && this.profilesChangesTable[ig.id]) {
        this.profilesChangesTable[ig.id] = this.differentialService.sort(
          this.profilesChangesTable[ig.id],
          this.selectedSort.value
        );
      }
    });
  }
  onChangedOptionEdit(event) {
    this.showUnchanged = !this.showUnchanged;
  }

  validateFilter(item) {
    return this.selectedFilter.find(
      (x) =>
        x.value === item.type &&
        (this.usageSearch
          ? item.name.toLowerCase().includes(this.usageSearch.toLowerCase())
          : true)
    );
  }
  selectDatatype(location) {
    let profile = this.profiles[0];
    let row = this.getRowByLocation(profile, location);
    console.log(this.igs, this.differentialService.differentialResults, row);

    const ref = this.dialogService.open(ComparisonModalComponent, {
      header: "",
      width: "100%",
      height: "600px",
      data: {
        igs: this.igs,
        results: this.differentialService.differentialResults,
        profile: row,
      },
    });
    ref.onClose.subscribe((c) => {
      if (c) {
      }
    });
    console.log(row);
  }
  getRowByLocation(profile, location) {
    let splits = location.split(".");
    if (profile) {
      if (splits.length > 1) {
        let newProfile = profile.children.find(
          (c) => c.data.position === splits[0]
        );
        splits.shift();
        let newLocation = splits.join(".");
        return this.getRowByLocation(newProfile, newLocation);
      } else if (splits.length === 1) {
        let p = profile.children.find((c) => c.data.position === splits[0]);
        return p;
      }
    }
  }
  showCodes(codes) {
    const ref = this.dialogService.open(CodeListModalComponent, {
      header: "Codes viewer",
      width: "100%",
      height: "600px",
      data: {
        codes: codes,
      },
    });
  }
}
