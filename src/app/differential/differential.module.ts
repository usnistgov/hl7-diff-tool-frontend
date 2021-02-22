import { NgModule } from '@angular/core';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DifferentialRoutingModule } from './differential-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ResultsComponent } from './results/results.component';



@NgModule({
  declarations: [ConfigurationComponent, ResultsComponent],
  imports: [
    SharedModule,
    DifferentialRoutingModule
  ]
})
export class DifferentialModule { }
