import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-compliance-viewer",
  templateUrl: "./compliance-viewer.component.html",
  styleUrls: ["./compliance-viewer.component.scss"]
})
export class ComplianceViewerComponent implements OnInit {
  @Input() profiles;
  @Input() igs;

  @Output() onClick = new EventEmitter();
  legend = [
    {
      context: "error",
      label: "Error",
      description: "Not allowable and needs intensive follow-up.",
      color:"#ffc6cd"

    },
    {
      context: "warning",
      label: "Warning",
      description: "Potentially not allowable and needs moderate follow-up.",
      color:"#ffeb9c"
    },
    {
      context: "informational",
      label: "Informational",
      description: "Different than what’s in the guide, but is allowable.",
      color:"#c5f0cd"
    },
 
  ]
  constructor() {}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {

  }

  selectProfile(profile) {
    this.onClick.emit(profile);
  }


}
