import {Component} from '@angular/core';
import {Weapon} from "../weapon";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WeaponInterfaceService} from "../weapon-interface.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Hero} from "../hero";
import {HeroInterfaceService} from "../hero-interface.service";

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent {
  heroes: Hero[] = []
  weapon: Weapon | undefined;
  stateWeaponButton = true;

  constructor(
    private route: ActivatedRoute,
    private weaponInterfaceService: WeaponInterfaceService,
    private location: Location,
    private heroInterfaceService: HeroInterfaceService,
  ) {
  }

  ngOnInit(): void {
    this.getWeapon();
    this.caracteristiqueForm.setValidators(this.validateTotalSum());
    this.getHeroesAssociate();
  }

  getHeroesAssociate(): void {
    this.heroInterfaceService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.filter(hero => hero.idWeapon == this.weapon?.id.toString())
    });
  }

  getWeapon(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.weaponInterfaceService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
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
      this.stateWeaponButton = true;

      // Calculez la somme des valeurs
      const totalSum = this.attaque.value + this.degats.value + this.esquive.value + this.pv.value;

      // Comparez la somme avec la limite (40) et renvoyez une erreur si elle est dépassée
      if (totalSum == 0) {
        this.stateWeaponButton = false;
        return {totalSumExceeded: true};
      }

      return null; // Aucune erreur, la somme est inférieure à 40
    };
  }

  onFormSubmit(): void {
    console.log(this.pv)
  }

  checkAttaque(): void {
    if (this.attaque.value < -5) {
      this.attaque.setValue(-5)
    } else if (this.attaque.value > 5) {
      this.attaque.setValue(5)
    }
  }

  checkDegat(): void {
    if (this.degats.value < -5) {
      this.degats.setValue(-5)
    } else if (this.degats.value > 5) {
      this.degats.setValue(5)
    }
  }

  checkEsquive(): void {
    if (this.esquive.value < -5) {
      this.esquive.setValue(-5)
    } else if (this.esquive.value > 5) {
      this.esquive.setValue(5)
    }
  }

  checkPV(): void {
    if (this.pv.value < -5) {
      this.pv.setValue(-5)
    } else if (this.pv.value > 5) {
      this.pv.setValue(5)
    }
  }

  pointToGive(): number {
    return 0 - (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value)
  }

  updateWeapon(): void {
    if (this.weapon) {
      this.weaponInterfaceService.updateWeapon(this.weapon)
    }
  }

}
