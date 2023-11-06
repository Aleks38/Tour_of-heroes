import {Component} from '@angular/core';
import {Weapon} from "../weapon";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WeaponInterfaceService} from "../weapon-interface.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent {
  weapon: Weapon | undefined;
  updateWeapon = true;

  constructor(
    private route: ActivatedRoute,
    private weaponInterfaceService: WeaponInterfaceService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getWeapon();
    this.caracteristiqueForm.setValidators(this.validateTotalSum());

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
      this.updateWeapon = true;

      // Calculez la somme des valeurs
      const totalSum = this.attaque.value + this.degats.value + this.esquive.value + this.pv.value;

      // Comparez la somme avec la limite (40) et renvoyez une erreur si elle est dépassée
      if (totalSum == 0) {
        this.updateWeapon = false;
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
    const rest = 0 - (this.attaque.value + this.degats.value + this.esquive.value + this.pv.value)
    return rest
  }

  // stateButton(): void {
  //   if
  // }

}
