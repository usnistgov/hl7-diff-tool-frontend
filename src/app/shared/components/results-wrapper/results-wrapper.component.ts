import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-results-wrapper",
  templateUrl: "./results-wrapper.component.html",
  styleUrls: ["./results-wrapper.component.scss"]
})
export class ResultsWrapperComponent implements OnInit {
  @Input() profile;
  @Input() results;
  @Input() igs;
  active = 1;
  selectedConfiguration;
  showReason = false;
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
  ]
  constructor() {}

  ngOnInit(): void {
    this.active = 1;
    this.selectedConfiguration = this.results.configuration[0]
    console.log(this.results);

    console.log(this.profile);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.active = 1;

  }

  selectProfile(profile) {
    this.onClick.emit(profile);
  }

  getBinding(data){
    console.log(data)
  }

  reasonChanged(event){
    console.log(event)
  }
}
