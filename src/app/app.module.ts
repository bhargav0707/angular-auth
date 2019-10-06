import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './stores/effects/auth.effects';
import { reducers } from './stores/app.states';
import {
  TokenInterceptor, ErrorInterceptor
} from './services/token.interceptor';
import { StatusComponent } from './components/status/status.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
    providers: [
      AuthService,
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
