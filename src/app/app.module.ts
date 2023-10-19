import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {CaracteristiqueFormComponent} from './caracteristique-form/caracteristique-form.component';
import {WeaponsComponent} from './weapons/weapons.component';
import {WeaponDetailComponent} from './weapon-detail/weapon-detail.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    CaracteristiqueFormComponent,
    WeaponsComponent,
    WeaponDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
