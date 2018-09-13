import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './module/core.module'
import { environment } from '../environments/environment'
import { appReducer } from './reducers'
import { TopicEffects } from './effects/topic.effects'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([TopicEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Topic App',
      logOnly: environment.production,
    }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
