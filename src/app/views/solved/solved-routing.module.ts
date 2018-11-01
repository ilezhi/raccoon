import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SolvedComponent } from './solved.component'
import { QuestionComponent } from './question/question.component'
import { AnswerComponent } from './answer/answer.component'

const routes: Routes = [
  {
    path: '', component: SolvedComponent,
    children: [
      {
        path: 'question',
        component: QuestionComponent
      },
      {
        path: 'answer',
        component: AnswerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolvedRoutingModule { }
