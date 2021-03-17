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
