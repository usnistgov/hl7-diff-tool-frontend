import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { TreeTableModule } from "primeng/treetable";
import { TableModule } from "primeng/table";
import { PanelModule } from "primeng/panel";
import { MultiSelectModule } from "primeng/multiselect";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { CardModule } from "primeng/card";

import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ProfileSelectorComponent } from "./components/profile-selector/profile-selector.component";
import { ResultsWrapperComponent } from "./components/results-wrapper/results-wrapper.component";
import { TreeTableComponent } from "./components/tree-table/tree-table.component";
import { ComparisonModalComponent } from "./components/comparison-modal/comparison-modal.component";
import { DataBadgeComponent } from "./components/data-badge/data-badge.component";
import { ValuesetTableComponent } from "./components/valueset-table/valueset-table.component";
import { CodesModalComponent } from "./components/codes-modal/codes-modal.component";
import { TooltipModule } from "primeng/tooltip";
import { ToggleButtonModule } from "primeng/togglebutton";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

import { BindingBadgeComponent } from "./components/binding-badge/binding-badge.component";
import { ComplianceViewerComponent } from "./components/compliance-viewer/compliance-viewer.component";
import { SummariesViewerComponent } from "./components/summaries-viewer/summaries-viewer.component";
import { UsagePercentageComponent } from "./components/usage-percentage/usage-percentage.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { SummariesOverviewViewerComponent } from "./components/summaries-overview-viewer/summaries-overview-viewer.component";
import { CardinalityPercentageComponent } from "./components/cardinality-percentage/cardinality-percentage.component";
import { BindingPercentageComponent } from "./components/binding-percentage/binding-percentage.component";
import { CommentsModalComponent } from "./components/comments-modal/comments-modal.component";
import { ConformanceStatementModalComponent } from "./components/conformance-statement-modal/conformance-statement-modal.component";
import { ConformanceStatementViewerComponent } from "./components/conformance-statement-viewer/conformance-statement-viewer.component";
import { CoConstraintViewerComponent } from "./components/co-constraint-viewer/co-constraint-viewer.component";
import { CoConstraintModalComponent } from "./components/co-constraint-modal/co-constraint-modal.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileSelectorComponent,
    ResultsWrapperComponent,
    ComplianceViewerComponent,
    SummariesViewerComponent,
    SummariesOverviewViewerComponent,
    DataBadgeComponent,
    ValuesetTableComponent,
    CodesModalComponent,
    CommentsModalComponent,
    BindingBadgeComponent,
    UsagePercentageComponent,
    CardinalityPercentageComponent,
    BindingPercentageComponent,
    ConformanceStatementModalComponent,
    ConformanceStatementViewerComponent,
    CoConstraintViewerComponent,
    CoConstraintModalComponent,
    TreeTableComponent,
    ComparisonModalComponent,
  ],
  entryComponents: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
    TreeTableModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    DynamicDialogModule,
    CardModule,
    TooltipModule,
    ToggleButtonModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    TreeTableModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    PanelModule,
    HeaderComponent,
    ProfileSelectorComponent,
    ResultsWrapperComponent,
    ComplianceViewerComponent,
    SummariesViewerComponent,
    SummariesOverviewViewerComponent,
    FormsModule,
    DataBadgeComponent,
    ValuesetTableComponent,
    CodesModalComponent,
    CommentsModalComponent,
    DynamicDialogModule,
    CardModule,
    TooltipModule,
    ToggleButtonModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    BindingBadgeComponent,
    UsagePercentageComponent,
    NgxSpinnerModule,
    CardinalityPercentageComponent,
    BindingPercentageComponent,
    ConformanceStatementModalComponent,
    ConformanceStatementViewerComponent,
    CoConstraintViewerComponent,
    CoConstraintModalComponent,
    TreeTableComponent,
    ComparisonModalComponent,
  ],
})
export class SharedModule {}
