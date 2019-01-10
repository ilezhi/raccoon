import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SolvedRoutingModule } from './solved-routing.module'
import { SolvedComponent } from './solved.component'

import { SharedModule } from 'src/app/module/shared.module'
import { QuestionComponent } from './question/question.component'
import { AnswerComponent } from './answer/answer.component'
import { solvedReducer } from 'src/app/reducers'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('solved', solvedReducer),
    SolvedRoutingModule
  ],
  declarations: [SolvedComponent, QuestionComponent, AnswerComponent]
})
export class SolvedModule { }
