import { NgModule, Injectable } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
// import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './module/core.module'
// import { environment } from '../environments/environment'
import { appReducer } from './reducers'
import { TagEffects } from './effects/tag.effects'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([TagEffects]),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
