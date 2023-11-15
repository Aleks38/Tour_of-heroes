import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../hero';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {HeroInterfaceService} from "../hero-interface.service";
import {Weapon} from "../weapon";
import {WeaponInterfaceService} from "../weapon-interface.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  stateHeroButton = true;
  weapons: Weapon[] = [];
  selectedWeapon?: Weapon;
  weapon?: Weapon;

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

  constructor(
    private route: ActivatedRoute,
    private heroInterfaceService: HeroInterfaceService,
    private location: Location,
    private weaponInterfaceService: WeaponInterfaceService
  ) {
  }

  ngOnInit(): void {
    this.getHero();
    this.caracteristiqueForm.setValidators(this.validateTotalSum());
    this.getWeapon();
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroInterfaceService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  validateTotalSum(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      this.stateHeroButton = true;

      // Calculez la somme des valeurs
      const totalSum = this.attaque.value + this.degats.value + this.esquive.value + this.pv.value;

      if (totalSum > 0 && totalSum < 41) {
        this.stateHeroButton = false;
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
    } else if (this.attaque.value > 40) {
      this.attaque.setValue(40)
    }
  }

  checkDegat(): void {
    if (this.degats.value < 1) {
      this.degats.setValue(1)
    } else if (this.degats.value > 40) {
      this.degats.setValue(40)
    }
  }

  checkEsquive(): void {
    if (this.esquive.value < 1) {
      this.esquive.setValue(1)
    } else if (this.esquive.value > 40) {
      this.esquive.setValue(40)
    }
  }

  checkPV(): void {
    if (this.pv.value < 1) {
      this.pv.setValue(1)
    } else if (this.pv.value > 40) {
      this.pv.setValue(40)
    }
  }

  pointToGive(): number {
    const rest = 40 - (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value);
    return rest;
  }

  updateHero(): void {
    if (this.hero && this.selectedWeapon) {
      this.hero.idWeapon = this.selectedWeapon.id.toString();
    }
    if (this.hero) {
      this.heroInterfaceService.updateHero(this.hero);
    }
    // console.log(this.validateWeapon())
  }

  getWeapon(): void {
    this.weaponInterfaceService.getWeapons().subscribe(weapons => this.weapons = weapons)
  }

  deleteWeapon(): void {
    if (this.hero) {
      this.hero.idWeapon = ""
    }
    this.updateHero()
  }

  findWeapon(): string {
    if (this.hero) {
      this.weaponInterfaceService.getWeapon(this.hero?.idWeapon).subscribe(weapon => this.weapon = weapon)
      if (this.weapon)
        return this.weapon.name;
    }
    return ''
  }

  validateWeapon(): boolean {
    if (this.hero && this.hero.idWeapon != '') {
      this.weaponInterfaceService.getWeapon(this.hero.idWeapon).subscribe(weapon => {
        this.weapon = weapon;
      });
      return (this.hero.attaque + this.hero.attaque) > 0 && (this.hero.esquive + this.hero.esquive) > 0 && (this.hero.degats + this.hero.degats) > 0 && (this.hero.pv + this.hero.pv) > 0;
    } else {
      return false
    }
  }
}
