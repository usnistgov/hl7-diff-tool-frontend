import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {TreeTableModule} from 'primeng/treetable';
import { PanelModule } from 'primeng/panel';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileSelectorComponent } from './components/profile-selector/profile-selector.component';
import { ResultsWrapperComponent } from './components/results-wrapper/results-wrapper.component';
import { DataBadgeComponent } from './components/data-badge/data-badge.component';
import { ValuesetTableComponent } from './components/valueset-table/valueset-table.component';
import { CodesModalComponent } from './components/codes-modal/codes-modal.component';
import {TooltipModule} from 'primeng/tooltip';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { BindingBadgeComponent } from './components/binding-badge/binding-badge.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileSelectorComponent,
    ResultsWrapperComponent,
    DataBadgeComponent,
    ValuesetTableComponent,
    CodesModalComponent,
    BindingBadgeComponent
  ],
  entryComponents: [],
  providers: [
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
    TreeTableModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    DynamicDialogModule,
    TooltipModule,
    ToggleButtonModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    TreeTableModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    PanelModule,
    HeaderComponent,
    ProfileSelectorComponent,
    ResultsWrapperComponent,
    FormsModule,
    DataBadgeComponent,
    ValuesetTableComponent,
    CodesModalComponent,
    DynamicDialogModule,
    TooltipModule,
    ToggleButtonModule,
    BindingBadgeComponent

  ]
})
export class SharedModule { }
