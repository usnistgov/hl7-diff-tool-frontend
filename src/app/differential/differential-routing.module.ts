import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { ResultsComponent } from './results/results.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { VerificationConfigurationComponent } from './verification-configuration/verification-configuration.component';

const routes: Routes = [
  {
    path: "configuration",
    component: ConfigurationComponent
  },
  {
    path: "verification-configuration",
    component: VerificationConfigurationComponent
  },
  
  {
    path: "differential",
    component: ResultsComponent
  },
  {
    path: "glossary",
    component: GlossaryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DifferentialRoutingModule {}
