import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroInterfaceService} from '../hero-interface.service';
import {Weapon} from "../weapon";
import {WeaponInterfaceService} from "../weapon-interface.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  weapons: Weapon[] = [];
  parametresTri: string[] = ['attaque', 'esquive', 'degats', 'pv'];
  selectedParametreTri?: string;

  constructor(private heroService: HeroInterfaceService, private weaponService: WeaponInterfaceService,) {
  }

  ngOnInit(): void {
    this.selectedParametreTri = this.parametresTri[0];
    this.getHeroesOrderBy();
    this.getWeaponsOrderBy();
  }

  getHeroesOrderBy(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        // Triez les héros en fonction du paramètre sélectionné
        // @ts-ignore
        this.heroes = heroes.sort((a, b) => b[this.selectedParametreTri] - a[this.selectedParametreTri]).slice(0, 4);
      });
  }

  getWeaponsOrderBy(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => {
        // Triez les weapons en fonction du paramètre sélectionné
        // @ts-ignore
        this.weapons = weapons.sort((a, b) => b[this.selectedParametreTri] - a[this.selectedParametreTri]).slice(0, 4);
      });
  }

  onParametreTriChange(): void {
    // Réagir au changement du paramètre de tri
    this.getHeroesOrderBy();
    this.getWeaponsOrderBy();
  }
}
