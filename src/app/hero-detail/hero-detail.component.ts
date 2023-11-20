import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../hero';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {HeroInterfaceService} from "../hero-interface.service";
import {Weapon} from "../weapon";
import {WeaponInterfaceService} from "../weapon-interface.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  stateHeroButton = true;
  weapons: Weapon[] = [];
  selectedWeapon: any;
  weapon?: Weapon;
  check = true;
  weaponIsBad = false

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
    private weaponInterfaceService: WeaponInterfaceService,
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

      return null;
    };
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
    return 40 - (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value);
  }


  updateHero(): void {
    if (this.hero && this.selectedWeapon && this.check) {
      this.hero.idWeapon = this.selectedWeapon.id.toString();
    }
    if (this.hero) {

      this.check = true
      this.heroInterfaceService.updateHero(this.hero);
    }
  }

  getWeapon(): void {
    this.weaponInterfaceService.getWeapons().subscribe(weapons => this.weapons = weapons)
  }

  deleteWeapon(): void {
    if (this.hero) {
      this.check = false;
      this.hero.idWeapon = "";
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

  async validateWeapon(): Promise<void> {
    //FixMe : Il y a un temps de retard entre ce qui est selectionné et ce qu'il y a dans selectedWeapon
    if (this.hero && this.hero.idWeapon == '') {
      console.log('tetetete')

      try {
        // Vérifiez si selectedWeapon n'est pas undefined
        if (!this.selectedWeapon) {
          // Gérez le cas où selectedWeapon est undefined
          console.error('Erreur : selectedWeapon est undefined');
          this.stateHeroButton = false;
          return;
        }

        const weapon = await firstValueFrom(this.weaponInterfaceService.getWeapon(this.selectedWeapon!.id.toString()));

        if (weapon) {
          this.stateHeroButton = !((this.hero.attaque + weapon.attaque) > 0 &&
            (this.hero.esquive + weapon.esquive) > 0 &&
            (this.hero.degats + weapon.degats) > 0 &&
            (this.hero.pv + weapon.pv) > 0);
          this.weaponIsBad = this.stateHeroButton
        } else {
          this.weaponIsBad = true
          this.stateHeroButton = true;
        }

      } catch (error) {
        console.error('Erreur lors de la récupération de l\'arme :', error);
        this.weaponIsBad = true
        this.stateHeroButton = true;
      }
    } else {
      this.weaponIsBad = true
      this.stateHeroButton = true;
    }
  }
}
