import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
