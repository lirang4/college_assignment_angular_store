import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ]
})
export class SharedModule { }
