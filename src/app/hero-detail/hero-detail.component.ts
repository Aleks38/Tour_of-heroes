import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../hero';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {HeroInterfaceService} from "../hero-interface.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroInterfaceService: HeroInterfaceService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getHero();
    this.caracteristiqueForm.setValidators(this.validateTotalSum());

  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroInterfaceService.getHero(id)
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
      if (totalSum == 40) {
        return {totalSumExceeded: true};
      }

      return null; // Aucune erreur, la somme est inférieure à 40
    };
  }

  onFormSubmit(): void {
    console.log(this.pv)
  }

  checkAttaque(): void {
    if (this.attaque.value < 1) {
      this.attaque.setValue(1)
    } else if (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value > 40) {
      this.attaque.setValue(40 - (this.degats.value + this.esquive.value + this.pv.value))
    }
  }

  checkDegat(): void {
    if (this.degats.value < 1) {
      this.degats.setValue(1)
    } else if (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value > 40) {
      this.degats.setValue(40 - (this.attaque.value - this.esquive.value - this.pv.value))
    }
  }

  checkEsquive(): void {
    if (this.esquive.value < 1) {
      this.esquive.setValue(1)
    } else if (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value > 40) {
      this.esquive.setValue(40 - (this.attaque.value - this.degats.value - this.pv.value))
    }
  }

  checkPV(): void {
    if (this.pv.value < 1) {
      this.pv.setValue(1)
    } else if (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value > 40) {
      this.pv.setValue(40 - (this.attaque.value - this.degats.value - this.esquive.value))
    }
  }

  pointToGive(): number {
    const rest = 40 - (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value);
    return rest;
  }
}
