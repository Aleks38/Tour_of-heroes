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

  constructor(private heroInterfaceService: HeroInterfaceService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroInterfaceService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  deleteHero(id: string): void {
    this.heroInterfaceService.deleteHero(id);
  }
}
