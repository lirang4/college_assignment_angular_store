import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJF_OmkQ97iwIHm2DPOBHxzFUbifmRohI'
    })
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AgmCoreModule,
  ]
})
export class SharedModule { }
