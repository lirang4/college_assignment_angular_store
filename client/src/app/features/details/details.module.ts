import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJF_OmkQ97iwIHm2DPOBHxzFUbifmRohI'
    })
  ]
})
export class DetailsModule { }
