import {Component, OnInit} from '@angular/core';

import {Hero} from '../hero';
import {HeroInterfaceService} from "../hero-interface.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  parametresTri: string[] = ['attaque', 'esquive', 'degats', 'pv'];
  selectedParametreTri?: string;
  searchTerm: string = '';

  constructor(private heroInterfaceService: HeroInterfaceService) {
  }

  ngOnInit(): void {
    this.selectedParametreTri = this.parametresTri[0];
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroInterfaceService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  getHeroesOrderByType(): void {
    // @ts-ignore
    this.heroes = this.heroes.sort((a, b) => b[this.selectedParametreTri] - a[this.selectedParametreTri]);
  }

  onSearch(): void {
    if (this.searchTerm != '') {
      this.heroes = this.heroes.filter((hero) =>
        hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getHeroesOrderByType()
    }
  }

  resetSearchBar(): void {
    this.searchTerm = ''
    this.getHeroes()
  }

  deleteHero(id: string): void {
    this.heroInterfaceService.deleteHero(id);
  }

  onParametreTriChange(): void {
    // Réagir au changement du paramètre de tri
    this.getHeroesOrderByType();
  }

  createNewHero(): void {
    const newHero: Hero = {
      id: 0,
      name: 'New',
      attaque: 0,
      esquive: 0,
      degats: 0,
      pv: 0,
      idWeapon: '',
    };

    this.heroInterfaceService.addHero(newHero);
  }

}
