import { NgModule } from '@angular/core';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DifferentialRoutingModule } from './differential-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ResultsComponent } from './results/results.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { VerificationConfigurationComponent } from './verification-configuration/verification-configuration.component';



@NgModule({
  declarations: [ConfigurationComponent, ResultsComponent, GlossaryComponent, VerificationConfigurationComponent],
  imports: [
    SharedModule,
    DifferentialRoutingModule
  ]
})
export class DifferentialModule { }
