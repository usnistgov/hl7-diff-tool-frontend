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
  selector: "app-summaries-viewer",
  templateUrl: "./summaries-viewer.component.html",
  styleUrls: ["./summaries-viewer.component.scss"]
})
export class SummariesViewerComponent implements OnInit {
  @Input() profiles;
  @Input() igs;
  Object = Object;
  totalChangesTable;
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
    { label: "By count", value: "total" },
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
  constructor(private differentialService: DifferentialService,) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.profiles);
    this.profiles.forEach(profile => {
      this.totalChangesTable = Object.keys(
        profile.summaries.totalChangesTable
      ).map(key => profile.summaries.totalChangesTable[key]);
      this.totalChangesTable = this.differentialService.sort(this.totalChangesTable, this.selectedSort.value);
        console.log(this.totalChangesTable)
      this.igs.forEach(ig => {
        if (profile.summaries.changesTable[ig.id]) {
          profile.summaries.changesTable[ig.id] = Object.keys(
            profile.summaries.changesTable[ig.id]
          ).map(key => profile.summaries.changesTable[ig.id][key]);
          profile.summaries.changesTable[ig.id] = this.differentialService.sort(
            profile.summaries.changesTable[ig.id], this.selectedSort.value
          );
        }
      });
      this.profilesChangesTable = profile.summaries.changesTable;
      console.log(this.profilesChangesTable)

    });
  }



  selectProfile(profile) {
    this.onClick.emit(profile);
  }

  sortChanged(event) {
    console.log(event);
    this.totalChangesTable = this.differentialService.sort(this.totalChangesTable, this.selectedSort.value);
    this.igs.forEach(ig => {
      if (this.profilesChangesTable[ig.id]) {
        this.profilesChangesTable[ig.id] = this.differentialService.sort(this.profilesChangesTable[ig.id], this.selectedSort.value);

      }
    });

  }
  validateFilter(item) {
    return this.selectedFilter.find(x => x.value === item.type);
  }
  filterChanged(event) {
    console.log(event);
   console.log(this.totalChangesTable)
  }
}
