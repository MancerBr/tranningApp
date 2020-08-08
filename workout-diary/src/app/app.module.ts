import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { effects, reducers } from './core/store';

export function getReducers() {
  return reducers;
}

export const reducerToken = new InjectionToken('APP Registered Reducers');
export const ReducerProvider = [{ provide: reducerToken, useFactory: getReducers }];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducerToken, {}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production,
        })
        : [],
      HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    ReducerProvider,
    CoreModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
