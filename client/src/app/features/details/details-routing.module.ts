import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details.component';
import { DetailsResolver } from './details.resolver';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    resolve: { message: DetailsResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DetailsResolver],
})
export class DetailsRoutingModule { }
