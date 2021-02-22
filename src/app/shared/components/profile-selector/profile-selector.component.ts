import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.scss']
})
export class ProfileSelectorComponent implements OnInit {

  @Input() profiles;
  @Output() onClick = new EventEmitter();
  selectedProfile;
  constructor() { }

  ngOnInit(): void {
  }

  selectProfile(profile){
    this.selectedProfile = profile;
    this.onClick.emit(profile);
  }

}
