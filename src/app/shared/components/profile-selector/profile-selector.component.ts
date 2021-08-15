import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-profile-selector",
  templateUrl: "./profile-selector.component.html",
  styleUrls: ["./profile-selector.component.scss"]
})
export class ProfileSelectorComponent implements OnInit {
  @Input() profiles;
  @Output() onClick = new EventEmitter();
  selectedProfile;
  selectedItem = "profile";
  constructor() {}

  ngOnInit(): void {
    if (this.profiles[0]) {
      this.selectProfile(this.profiles[0]);
    }
  }

  selectProfile(profile) {
    this.selectedItem = "profile";
    this.selectedProfile = profile;
    this.onClick.emit({ type: this.selectedItem, profile });
  }

  select(type) {
    this.selectedItem = type;
    this.onClick.emit({ type: this.selectedItem });

  }
}
