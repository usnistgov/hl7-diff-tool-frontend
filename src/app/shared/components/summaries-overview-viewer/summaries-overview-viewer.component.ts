import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { DifferentialService } from '../../services/differential.service';

@Component({
  selector: "app-summaries-overview-viewer",
  templateUrl: "./summaries-overview-viewer.component.html",
  styleUrls: ["./summaries-overview-viewer.component.scss"]
})
export class SummariesOverviewViewerComponent implements OnInit {
  @Input() profiles;
  @Input() igs;
  @Input() srcIg;
  Object = Object;
  usageChangesTable;
  profilesChangesTable;

  @Output() onClick = new EventEmitter();
  legend = [
    {
      context: "error",
      label: "Error",
      description: "Not allowable and needs intensive follow-up.",
      color: "#ffc6cd"
    },
    {
      context: "warning",
      label: "Warning",
      description: "Potentially not allowable and needs moderate follow-up.",
      color: "#ffeb9c"
    },
    {
      context: "informational",
      label: "Informational",
      description: "Different than what’s in the guide, but is allowable.",
      color: "#c5f0cd"
    }
  ];
  sortingList = [
    { label: "Alphabetically", value: "path" },
    { label: "By position", value: "globalPath" }
  ];
  filterList = [
    { label: "Group", value: "group" },
    { label: "Segment", value: "segmentRef" },
    { label: "Field", value: "field" },
    { label: "Component", value: "component" },
    { label: "Subcomponent", value: "subcomponent" },

  ];
  selectedSort = this.sortingList[1];
  selectedFilter = this.filterList
  constructor(private differentialService: DifferentialService) {}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.profiles);
    this.profiles.forEach(profile => {
      this.usageChangesTable = Object.keys(
        profile.summaries.usageChangesOverview
      ).map(key => profile.summaries.usageChangesOverview[key]);
      this.usageChangesTable = this.differentialService.sort(this.usageChangesTable, this.selectedSort.value);
        console.log(this.usageChangesTable)

      console.log(this.profilesChangesTable)

    });
  }
  sortChanged(event) {
    console.log(event);
    this.usageChangesTable = this.differentialService.sort(this.usageChangesTable, this.selectedSort.value);
    this.igs.forEach(ig => {
      if (this.profilesChangesTable[ig.id]) {
        this.profilesChangesTable[ig.id] = this.differentialService.sort(this.profilesChangesTable[ig.id] , this.selectedSort.value);

      }
    });

  }
  validateFilter(item) {
    return this.selectedFilter.find(x => x.value === item.type);
  }

}
