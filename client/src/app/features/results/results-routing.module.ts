import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResultsComponent } from './results.component';
import { ResultsResolver } from './results.resolver';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
    resolve: { message: ResultsResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResultsResolver],
})
export class ResultsRoutingModule { }
