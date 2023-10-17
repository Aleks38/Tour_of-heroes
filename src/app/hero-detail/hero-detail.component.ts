import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getHero();
    this.caracteristiqueForm.setValidators(this.validateTotalSum());

  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  private attaque: FormControl = new FormControl('');
  private degats: FormControl = new FormControl('');
  private esquive: FormControl = new FormControl('');
  private pv: FormControl = new FormControl('');

  caracteristiqueForm = new FormGroup({
    attaque: this.attaque,
    degats: this.degats,
    esquive: this.esquive,
    pv: this.pv,
  });

  validateTotalSum(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      // Calculez la somme des valeurs
      const totalSum = this.attaque.value + this.degats.value + this.esquive.value + this.pv.value;

      // Comparez la somme avec la limite (40) et renvoyez une erreur si elle est dépassée
      if (totalSum > 40) {
        return {totalSumExceeded: true};
      }

      return null; // Aucune erreur, la somme est inférieure à 40
    };
  }

  onFormSubmit(): void {
    console.log(this.pv)
  }
}
