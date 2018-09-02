import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolvedComponent } from './solved.component'

const routes: Routes = [
  {
    path: '', component: SolvedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolvedRoutingModule { }
