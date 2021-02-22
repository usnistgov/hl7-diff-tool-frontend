import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: "configuration",
    component: ConfigurationComponent
  },
  {
    path: "differential",
    component: ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DifferentialRoutingModule {}
