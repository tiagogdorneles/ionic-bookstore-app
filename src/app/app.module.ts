import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import localeBr from '@angular/common/locales/br';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeBr);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},{ provide: LOCALE_ID, useValue: 'pt_BR'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
