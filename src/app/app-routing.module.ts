import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {WeaponsComponent} from "./weapons/weapons.component";
import {WeaponDetailComponent} from "./weapon-detail/weapon-detail.component";
import {AuthentificationComponent} from "./authentification/authentification.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'hero/detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'weapon/detail/:id', component: WeaponDetailComponent},
  {path: 'weapons', component: WeaponsComponent},
  {path: 'auth', component: AuthentificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
