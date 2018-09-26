import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SolvedComponent } from './solved.component'
import { QuestionComponent } from './question/question.component'
import { AnswerComponent } from './answer/answer.component'
import { QTopicsSuccess, ATopicsSuccess} from 'src/app/action/solved.action'

const routes: Routes = [
  {
    path: '', component: SolvedComponent,
    children: [
      {
        path: 'question',
        component: QuestionComponent,
        data: {
          page: 'solved@question',
          action: QTopicsSuccess
        }
      },
      {
        path: 'answer',
        component: AnswerComponent,
        data: {
          page: 'solved@answer',
          action: ATopicsSuccess
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolvedRoutingModule { }
