import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsComponent } from './results.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ResultsRoutingModule,
  ]
})
export class ResultsModule { }
