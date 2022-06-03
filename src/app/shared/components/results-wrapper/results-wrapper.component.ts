import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { CommentsModalComponent } from "../comments-modal/comments-modal.component";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-results-wrapper",
  templateUrl: "./results-wrapper.component.html",
  styleUrls: ["./results-wrapper.component.scss"],
  providers: [DialogService]
})
export class ResultsWrapperComponent implements OnInit {
  @Input() profile;
  @Input() results;
  @Input() igs;
  activeTab = 'profiles'
  active = 1;
  fullConfigOptions;
  segmentConfigOptions;

  selectedConfiguration;
  showReason = false;
  compliance = false;
  consequential = {
    name: 'consequential',
    label: 'Consequential',

  };
  removeReason = false;
  consequentialOptions = [{
    name: 'consequential',
    label: 'Consequential',

  }, {
    name: 'non-consequential',
    label: 'Non-consequential',

  }, {
    name: 'all-changes',
    label: 'All changes',

  },]
  @Output() onClick = new EventEmitter();
  legend = [
    {
      context: "profile",
      label: "Conformance Profile"
    },
    {
      context: "segment",
      label: "Segment"
    },
    {
      context: "datatype_field",
      label: "Datatype (FIELD)"
    },
    {
      context: "datatype_component",
      label: "Datatype (COMPONENT)"
    }
  ];
  faExclamationTriangle = faExclamationTriangle;
  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    this.active = 1;
    this.fullConfigOptions = this.results.configuration;
    this.segmentConfigOptions = this.results.configuration.filter(c => c.name !== 'label');

    this.selectedConfiguration = this.results.configuration[0];
    console.log(this.results);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.active = 1;
    const self = this;
    const derivedProfiles = this.igs.filter(
      ig => self.results.srcIg.profileId === ig.profileOrigin && ig.derived
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
    if (event.nextId !== 1 && event.activeId === 1 && this.selectedConfiguration.name === 'label') {
      this.selectedConfiguration = this.results.configuration[0];
    }
  }

  getBinding(data) { }

  reasonChanged(event) { }
  comment(rowData, param, igId) {
    const ref = this.dialogService.open(CommentsModalComponent, {
      header: "Comments",
      width: "100%",
      height: "600px",
      data: {
        comments: rowData[param].derived[igId].comments
      }
    });
    ref.onClose.subscribe(c => {
      if (c) {
        rowData[param].derived[igId].comments = c;
      }
    });
  }
  commentVs(rowData, igId) {
    console.log(rowData);
    if (!rowData.bindingsComments) {
      rowData.bindingsComments = {};
    }
    const ref = this.dialogService.open(CommentsModalComponent, {
      header: "Comments",
      width: "100%",
      height: "600px",
      data: {
        comments: rowData.bindingsComments[igId]
      }
    });
    ref.onClose.subscribe(c => {
      if (c) {
        rowData.bindingsComments[igId] = c;
      }
    });
  }

}
